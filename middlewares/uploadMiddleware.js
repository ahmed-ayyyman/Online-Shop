const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Multer memory storage
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Not an image! Please upload images only."), false);
};

const upload = multer({ storage, fileFilter });

// Ensure uploads dir exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

exports.uploadProductImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

exports.resizeProductImages = async (req, res, next) => {
  try {
    if (!req.files) return next();

    const uploadDir = path.join(process.cwd(), "uploads", "products");
    ensureDir(uploadDir);

    // cover image
    if (req.files.imageCover && req.files.imageCover.length) {
      const file = req.files.imageCover[0];
      const filename = `product-${Date.now()}-cover.jpeg`;
      await sharp(file.buffer)
        .resize(800, 800, { fit: "cover" })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(uploadDir, filename));
      req.body.imageCover = `uploads/products/${filename}`;
    }

    // other images
    if (req.files.images && req.files.images.length) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (file, idx) => {
          const filename = `product-${Date.now()}-${idx + 1}.jpeg`;
          await sharp(file.buffer)
            .resize(800, 800, { fit: "cover" })
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(path.join(uploadDir, filename));
          req.body.images.push(`uploads/products/${filename}`);
        }),
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
