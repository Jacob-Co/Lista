const categoryRouter = require('express').Router();
const Category = require('../models/category');
const Task = require('../models/task');
const User = require('../models/users');
const SSEUserIds = require('../utils/SSEUserIds');

// Helper Methods

const fixDisplayedCategories = async (categories, message, userId) => {
  categories = sortCategories(categories, userId);

  if (!categories[0] ||
      userId === categories[0].user.toString() 
        ? !categories[0].workingOn 
        : !categories[0].sentToWorkingOn
      // (!categories[0].workingOn && !categories[0].sentToWorkingOn) ||
      // (categories[0].index != 0 && categories[0].sentToIndex != 0) // use userId
     ){
    const nullCategory = new Category({ 
      name: `--${message}--`,
      index: 0,
      extraInfo: 'placeHolder',
    });
    categories = [nullCategory].concat(categories)
  };

  let returnCategories = [];
  for (const category of categories) {
    if (category.taskWorkingOn) await category.populate('taskWorkingOn').execPopulate();
    if (category.sentTo) {
      await category.populate({ path: 'sentTo', select: 'username' }).execPopulate();
      await category.populate({ path: 'user', select: 'username' }).execPopulate();
    }
    category.tasks = category.tasks.sort((task1, task2) => task1.index - task2.index);
    returnCategories = returnCategories.concat(category);
  }

  return returnCategories;
}

const sortCategories = (categories, userId) => {
  categories = categories.sort((category1, category2) => {
    const index1 = category1.user.toString() === userId ? category1.index : category1.sentToIndex;
    const index2 = category2.user.toString() === userId ? category2.index : category2.sentToIndex;
    return index1 - index2;
  });
  return categories;
}

const getAllDisplayedCategories = async (userId) => {
  let categories = await Category.find({ user: userId})
  const sentToCategories = await Category.find({ sentTo: userId });
  categories = categories.concat(sentToCategories);
  return categories;
}

const genericPatchHelper = async (propertyToUpdate, req) => {
  const { token } = req;
  if (!token) return { error: "Requires a token"};

  const { body } = req;

  const categoryToUpdate = await Category.findById(req.params.id);
  if (!categoryToUpdate) return { "error": "No Category found"};
  if (categoryToUpdate.user.toString() !== token.id &&
    categoryToUpdate.sentTo.toString() !== token.id) {
      return { "error": "Invalid access" }
  }

  categoryToUpdate[propertyToUpdate] = body[propertyToUpdate];
  const returnCategory = await categoryToUpdate.save();

  return returnCategory;
}

// GET HANDLER
categoryRouter.get('/', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});

  const categories = await getAllDisplayedCategories(token.id);
  const returnCategories = await fixDisplayedCategories(categories, 'Double click an item to place here', token.id);

  res.status(200).json(returnCategories);
});

categoryRouter.get('/friend/:id', async (req,res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});
  
  const friend = await User.findById(req.params.id);
  if (!friend.friends.some(id => id.toString() === token.id)) return res.status(400).json({ error: 'You are not friends' });
  
  const categories = await getAllDisplayedCategories(friend.id);
  const returnCategories = await fixDisplayedCategories(categories, 'None', friend.id);

  res.status(200).json(returnCategories);
});

categoryRouter.get('/sentTo', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(400).json({error: 'Requires token'});
  let sentCategories = await Category.find({ sentTo: token.id });
  let returnCategories = [];
  if (sentCategories.length > 0) {
    for (const category of sentCategories) {
      await category.populate({ path: 'user', select: 'username'}).execPopulate();
      returnCategories = returnCategories.concat(category);
    }
  }
  return res.json(returnCategories);
})

categoryRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const returnedCategory = await Category.findById(id);
  res.status(201).json(returnedCategory);
})

// POST HANDLER

categoryRouter.post('/', async (req, res) => {
  const { token } = req;

  if (!token) return res.status(401).json({ error: "Requires a token"})

  const { name, summary, index } = req.body;
  
  const newCategory = new Category({ name, summary, user: token.id, index });
  const returnedCategory = await newCategory.save();

  res.status(201).json(returnedCategory);
})

// DELETE HANDLER
categoryRouter.delete('/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const categoryToDelete = await Category.findById(req.params.id);
  if (categoryToDelete.user.toString() !== token.id) return res.sendStatus(403);

  if (categoryToDelete.sentTo) {
    await categoryToDelete.populate({ path: 'sentTo', select: 'username' }).execPopulate();
    const username = categoryToDelete.sentTo.username;
    if (SSEUserIds[username]) {
      const sentToRes = SSEUserIds[username];
      sentToRes.write(`data: re-initialize\n\n`);
      sentToRes.flush();
    }
  }

  for (const taskId of categoryToDelete.tasks) {
    await Task.findByIdAndDelete(taskId);
  }
  await categoryToDelete.delete();
  res.status(204).end();
})

//PATCH HANDLER
categoryRouter.patch('/name/:id', async (req, res) => {
  const returnCategory = await genericPatchHelper('name', req);
  if (returnCategory.error) return res.status(400).json(returnCategory);
  return res.json(returnCategory);
})

categoryRouter.patch('/summary/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modify = { summary: req.body.summary }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  res.status(201).json(returnedCategory);
})

categoryRouter.patch('/index/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const categoryId = req.params.id;
  const newIndex = req.body.index;
  const filter = { user: token.id, _id: categoryId };
  const modify = { index: newIndex };
  const options = { new: true };
  const updatedCategory = await Category.findOneAndUpdate(filter, modify, options);
  if (!updatedCategory) return res.status(401).json({ error: "No category found"});
  const returnCategory = await updatedCategory.populate('tasks').execPopulate();
  return res.json(returnCategory);
})

categoryRouter.patch('/workingOn/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const { isSentCategory, isWorkingOn } = req.body;

  const filter = isSentCategory
    ? { sentTo: token.id, _id: req.params.id }
    : { user: token.id, _id: req.params.id };

  const modify = isSentCategory
    ? { sentToWorkingOn: isWorkingOn }
    : { workingOn: isWorkingOn}

  const options = { new: true };
  const newWorkingOn = await Category.findOneAndUpdate(filter, modify, options);

  const returnCategory = await newWorkingOn.populate('tasks').execPopulate();
  if (isSentCategory) {
    await returnCategory.populate({ path: 'sentTo', select: 'username' }).execPopulate();
    await returnCategory.populate({ path: 'user', select: 'username' }).execPopulate();
  }

  return res.json(returnCategory);
})

categoryRouter.patch('/taskWorkingOn/:id', async (req, res) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: "Requires a token"});

  const { taskId } = req.body;

  const categoryToUpdate = await Category.findById(req.params.id);

  if (!categoryToUpdate) return json.status(400).json({ "error": "No Category found"})

  if (taskId === null) {
    categoryToUpdate.taskWorkingOn = null;
    const returnCategory = await categoryToUpdate.save();
    return res.json(returnCategory);
  } else if (categoryToUpdate.tasks.find(task => task._id.toString() === taskId)) {
    categoryToUpdate.taskWorkingOn = taskId;
    const returnCategory = await categoryToUpdate.save();
    return res.json(returnCategory);
  }

  return res.status(400).json({'error': 'taskId not found'});
})

categoryRouter.patch('/accomplished/:id', async (req, res) => {
  const returnCategory = await genericPatchHelper('accomplished', req);
  if (returnCategory.error) return res.status(400).json(returnCategory);
  if (returnCategory.sentTo) {
    await returnCategory.populate({ path: 'user', select: 'username' }).execPopulate();
    const username = returnCategory.user.username;
    if (SSEUserIds[username]) {
      const sentToRes = SSEUserIds[username];
      sentToRes.write(`data: re-initialize\n\n`);
      sentToRes.flush();
    }
  }
  return res.json(returnCategory);
});

categoryRouter.patch('/sentTo/:id', async (req, res) => {
  const sentToId = req.body.sentTo;
  let prevUsername;
  if (!sentToId) { // send an SSE to prev sentTo User
    const returnCategory = await Category.findById(req.params.id)
      .populate({ path : 'sentTo', select: 'username'});
    prevUsername = returnCategory.sentTo.username;
  }

  const returnCategory = await genericPatchHelper('sentTo', req);
  if (returnCategory.error) return res.status(400).json(returnCategory);

  returnCategory.sentToWorkingOn = false;
  await returnCategory.save();

  if (sentToId) {
    const sentToCategories = await getAllDisplayedCategories(sentToId);
    for (const category of sentToCategories) {
      if (category.id === returnCategory.id) {
        category.sentToIndex = 1;
      } else {
        const indexToIncrement = category.user.toString() === sentToId ? 'index' : 'sentToIndex';
        if (category[indexToIncrement] === 0) continue;
        category[indexToIncrement] += 1;
      }
  
      await category.save();
    }
    await returnCategory.populate({ path : 'sentTo', select: 'username'}).execPopulate();
    if (SSEUserIds[returnCategory.sentTo.username]) {
      const sentToRes = SSEUserIds[returnCategory.sentTo.username];
      sentToRes.write(`data: re-initialize\n\n`);
      sentToRes.flush();
    }
  } else {
    if (SSEUserIds[prevUsername]) {
      const sentToRes = SSEUserIds[prevUsername];
      sentToRes.write(`data: re-initialize\n\n`);
      sentToRes.flush();
    }
  }

  await returnCategory.populate('tasks').execPopulate();
  return res.json(returnCategory);
});

categoryRouter.patch('/sentToIndex/:id', async (req, res) => {
  const returnCategory = await genericPatchHelper('sentToIndex', req);
  if (returnCategory.error) return res.status(400).json(returnCategory);
  return res.json(returnCategory);
})

module.exports = categoryRouter