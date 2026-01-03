const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Artwork = require("../models/Artwork");
const User = require("../models/User");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Multer to use Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "artworks", // The folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// GET all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


// GET artworks by specific user (Public Profile)
router.get("/user/:userId", async (req, res) => {
  try {
    const artworks = await Artwork.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST artwork (UPLOAD IMAGE TO CLOUDINARY)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const artwork = new Artwork({
      title: req.body.title,
      // Cloudinary returns the secure URL in req.file.path
      imageUrl: req.file.path, 
      user: user._id,
      username: user.username,
    });

    await artwork.save();
    res.json(artwork);
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});

// DELETE artwork
router.delete("/:id", auth, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);

    if (!artwork) return res.status(404).json({ msg: "Not found" });

    if (artwork.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    // Optional: Delete image from Cloudinary as well
    // Extract public_id from the imageUrl if you want to implement strictly
    
    await artwork.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;