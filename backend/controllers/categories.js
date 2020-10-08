const categoryRouter = require('express').Router();
const Category = require('../models/category');

categoryRouter.get('/', async (req, res) => {
  const categories = await Category.find({})
  res.status(201).json(categories);
});

categoryRouter.get('/superCategories', async(req, res) => {
  const filter = {
    superCategory: undefined
  }
  const categories = await Category.find(filter)
  res.status(201).json(categories);
})

categoryRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const returnedCategory = await Category.findById(id);
  res.status(201).json(returnedCategory);
})

categoryRouter.post('/', async (req, res) => {
  const { name, summary, superCategory } = req.body;
  let returnedCategory
  
  // Add to new Cateogry to is superCateogy's subCategory
  if ( superCategory ) {
    const parentCategory = await Category.findById(superCategory);
    if (parentCategory.level >= 2) throw Error("Category level exceeds 2");

    level = parentCategory.level + 1
    const parentSubCategories = parentCategory.subCategories;
    const newCategory = new Category({ name, summary, superCategory, level });
    returnedCategory = await newCategory.save();

    const modify = { 
      subCategories: parentSubCategories.concat(returnedCategory.id),
      depth: parentSubCategories.length <= 0 
        ? parentCategory.depth + 1
        : parentCategory.depth
    };

    await Category.findByIdAndUpdate(superCategory, modify)

    if (returnedCategory.level >= 2) {
      const topCategory = await Category.findById(parentCategory.superCategory);
      if (topCategory.subCategories.length <= 0) {
        const modify = {
          depth: topCategory.depth + 1
        }

        await Category.findByIdAndUpdate(parentCategory.superCategory, modify)
      }
    }
  } else {
    const newCategory = new Category({ name, summary, superCategory });
    returnedCategory = await newCategory.save();
  }

  
  res.status(201).json(returnedCategory);
})

categoryRouter.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  res.status(204).end();
})

categoryRouter.patch('/name/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modify = { name: req.body.name }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  res.status(201).json(returnedCategory);
})

categoryRouter.patch('/summary/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const modify = { summary: req.body.summary }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  res.status(201).json(returnedCategory);
})

categoryRouter.patch('/superCategory/:id', async (req, res) => {
  const givenId = req.params.id
  const newSuperCategoryId = req.body.superCategory

  // cannot be assigned to self
  if (givenId === newSuperCategoryId) return res.status(400).end()
  
  // if chosen superCategory is the same as the previous return status 400
  const chosenCategory = await Category.findById(givenId);
  if (chosenCategory.superCategory && chosenCategory.superCategory.toString() === newSuperCategoryId) return res.status(400).end()

  // if new superCategory has the chosen Category as a subCategory return 400
  const newSuperCategory = await Category.findById(newSuperCategoryId);
  console.log('*******' + !!chosenCategory.subCategories.find(id => id.toString() === newSuperCategory.id))
  if (chosenCategory.subCategories.find(id => id.toString() === newSuperCategory.id)) return res.status(400).end()

  // remove given category from previos superCategory if it contains a superCategory
  if (chosenCategory.superCategory) {
    const previousSuperCategory = await Category.findById(chosenCategory.superCategory);
    previousSuperCategory.subCategories = previousSuperCategory.subCategories
      .filter(subCategory => {
        return subCategory.toString() != chosenCategory.id
      });
    await previousSuperCategory.save();
  }

  // change superCategory
  const filter = { _id: givenId }
  const modify = { superCategory: newSuperCategoryId }
  const options = { new: true }
  const returnedCategory = await Category.findOneAndUpdate(filter, modify, options);
  
  // add chosen category to new superCategory
  newSuperCategory.subCategories = newSuperCategory.subCategories.concat(givenId);
  await newSuperCategory.save();
  
  console.log('***********')
  res.status(201).json(returnedCategory);
})

module.exports = categoryRouter