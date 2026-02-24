const mongoose = require("mongoose");

// 1- Create Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory should be unique"],
      minlength: [2, "Too short subcategory name"],
      maxlength: [32, "Too long subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to a category"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
