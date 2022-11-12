const mongoose = require("mongoose");
const CategorySchema = require("../CategorySchema");
const Category = mongoose.model("Category", CategorySchema);


const getAllCategories = async () => {
    try{
    const categories = await Category.find()
    return categories
    }catch(error){
        return error
    }
    
}

module.exports = getAllCategories;
