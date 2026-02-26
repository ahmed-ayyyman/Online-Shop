const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route :${req.originalUrl}`, 400));
});
// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down....");
    process.exit(1);
  });
});
