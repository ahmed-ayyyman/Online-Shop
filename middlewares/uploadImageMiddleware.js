const multer = require("multer");
const ApiError = require("../utils/apiError");

exports.uploadSingleImage = (fieldName) => {
  // 1) Memory Storage engine
  const storage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype && file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only Images allowed", 400), false);
    }
  };

  const upload = multer({ storage: storage, fileFilter: multerFilter });

  return upload.single(fieldName);
};
