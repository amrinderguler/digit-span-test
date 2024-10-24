const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Set up storage for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid filename collisions
  }
});

// Initialize multer
const upload = multer({ storage });

// Ensure upload directory exists
if (!fs.existsSync('uploads/')) {
  fs.mkdirSync('uploads/');
}

// API endpoint to receive results
app.post("/api/submit-results", upload.single("video"), (req, res) => {
  const { score, time } = req.body;
  const videoPath = req.file ? req.file.path : null; // Get the uploaded video path

  // Save results (you can modify this to save to a database instead)
  console.log("Score:", score);
  console.log("Time:", time);
  console.log("Video path:", videoPath);

  res.status(200).json({ message: "Results received successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
