const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  name: { type: String, unique: true },
  description: String,
  category: String,
  date_added: { type: Date, default: Date.now },
  added_by: String,
  comments: [{ body: String, date: Date }],
  author: String,
  img: {
    data: Buffer,
    name:String,
    contentType: String,
  },
  link: String,
  rating: [{ type: Number }],
});

module.exports = new mongoose.model("Article", articleSchema);
