const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const arrCategories = await Category.find();
  ctx.body = {categories: arrCategories};
};
