const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  favorites: [{ body: String }],
  profilePicture:{ data: Buffer,
    contentType: String,
  },
  date_added: { type: Date, default: Date.now },
});

module.exports = new mongoose.model("User", userSchema);
