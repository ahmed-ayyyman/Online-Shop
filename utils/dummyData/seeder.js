const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Product = require("../../models/productModel");

dotenv.config({ path: path.resolve(__dirname, "../../config.env") });

// 1. Connect to DB
mongoose.connect(process.env.DB_URI).then(() => {
  console.log("Database Connected...");
});

// 2. Read the generated JSON file
const products = JSON.parse(
  fs.readFileSync("./e-commerce-db.products.json", "utf-8"),
);

// 3. Import Data into DB
const insertData = async () => {
  try {
    // Ensure string ids from the generated JSON are converted to ObjectId
    const prepared = products.map((p) => {
      const prod = { ...p };
      try {
        if (prod.category && typeof prod.category === "string")
          prod.category = mongoose.Types.ObjectId(prod.category);
      } catch (e) {}
      try {
        if (prod.brand && typeof prod.brand === "string")
          prod.brand = mongoose.Types.ObjectId(prod.brand);
      } catch (e) {}
      if (Array.isArray(prod.subCategories)) {
        prod.subCategories = prod.subCategories.map((id) => {
          try {
            return mongoose.Types.ObjectId(id);
          } catch (e) {
            return id;
          }
        });
      }

      return prod;
    });

    await Product.create(prepared);
    console.log("Data Successfully Inserted!");
    process.exit();
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
};

// 4. Delete existing Data (Clean slate)
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Successfully Deleted!");
    process.exit();
  } catch (error) {
    console.error("Error deleting data:", error);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
} else {
  console.error("Please provide a valid flag: -i (insert) or -d (delete)");
  process.exit(1);
}
