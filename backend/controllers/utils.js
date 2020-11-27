const Category = require('../models/category');

const getAllDisplayedCategories = async (userId) => {
  let categories = await Category.find({ user: userId})
  const sentToCategories = await Category.find({ sentTo: userId });
  categories = categories.concat(sentToCategories);
  return categories;
};

const incrementAllCategoriesByOne = async (userId) => {
  const displayedCategories = await getAllDisplayedCategories(userId);

  for (const category of displayedCategories) {
    const indexToIncrement = category.user.toString() === sentToId ? 'index' : 'sentToIndex';
    if (category[indexToIncrement] === 0) continue;
    category[indexToIncrement] += 1;
    await category.save();
  }
}


module.exports = { getAllDisplayedCategories, incrementAllCategoriesByOne };