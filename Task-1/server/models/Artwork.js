const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  title: String,
  imageUrl: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Artwork", ArtworkSchema);
