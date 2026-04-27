const multer = require("multer");

// Use memory storage (NOT disk)
const storage = multer.memoryStorage();

// Optional file filter (recommended)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;