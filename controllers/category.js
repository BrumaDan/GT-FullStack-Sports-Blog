const Category = require("../db/models/CategorySchema");

const getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    return error;
  }
};

module.exports = getAllCategories;
