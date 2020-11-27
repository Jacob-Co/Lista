const Category = require('../models/category');

const getAllDisplayedCategories = async (userId) => {
  let categories = await Category.find({ user: userId})
  const sentToCategories = await Category.find({ sentTo: userId });
  categories = categories.concat(sentToCategories);
  return categories;
};

// const incrementAllCategoriesByOne = async (userId) => {
//   const displayedCategories = await getAllDisplayedCategories(userId);

// }


module.exports = { getAllDisplayedCategories }