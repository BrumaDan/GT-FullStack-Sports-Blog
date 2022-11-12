const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, unique: true },
  description: String,});

module.exports = categorySchema;
