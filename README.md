# Online Shop - Node.js E-Commerce REST API

A RESTful API backend for an online shopping platform built with Node.js, Express.js, and MongoDB. It provides full CRUD operations for managing products, categories, sub-categories, and brands, along with advanced filtering, searching, sorting, and pagination.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Categories](#categories)
  - [Sub-Categories](#sub-categories)
  - [Brands](#brands)
  - [Products](#products)
- [Query Parameters](#query-parameters)
- [Error Handling](#error-handling)

---

## Features

- **Product Management** – Full CRUD with support for multiple images, color variations, discount pricing, and inventory tracking.
- **Category Management** – Hierarchical categorization with slug generation and image support.
- **Sub-Category Management** – Nested under parent categories with referential integrity validation.
- **Brand Management** – Brand CRUD with slug generation.
- **Advanced Filtering** – Filter products by price, quantity, rating, category, and more using MongoDB query operators.
- **Search** – Keyword search across product names and descriptions.
- **Pagination** – Configurable page size and number.
- **Sorting** – Sort results by any field, ascending or descending.
- **Field Limiting** – Request only the fields you need in the response.
- **Input Validation** – Comprehensive request validation on all endpoints.
- **Global Error Handling** – Centralized error middleware with environment-aware responses (stack traces in development, clean messages in production).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | express-validator |
| Dev Server | nodemon |
| Testing | Jest + Supertest |

---

## Project Structure

```
Online-Shop/
├── config/
│   └── database.js          # MongoDB connection setup
├── middlewares/
│   ├── errorMiddleware.js   # Global error handling
│   └── validatorMiddleware.js # express-validator result handler
├── models/
│   ├── categoryModel.js     # Category schema
│   ├── brandModel.js        # Brand schema
│   ├── subCategoryModel.js  # SubCategory schema
│   └── productModel.js      # Product schema
├── routes/
│   ├── categoryRoute.js     # Category routes
│   ├── brandRoute.js        # Brand routes
│   ├── subCategoryRoute.js  # SubCategory routes (nested)
│   └── productRoute.js      # Product routes
├── services/
│   ├── categoryService.js   # Category business logic
│   ├── brandService.js      # Brand business logic
│   ├── subCategoryService.js # SubCategory business logic
│   └── productService.js    # Product business logic
├── utils/
│   ├── apiError.js          # Custom error class
│   ├── dummyData/           # DB seed scripts and test data
│   └── validators/          # Input validators for each resource
├── server.js                # App entry point
├── config.env               # Environment variables (not committed)
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) v6 or higher
- A running [MongoDB](https://www.mongodb.com/) instance (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmed-ayyyman/Online-Shop.git
   cd Online-Shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `config.env` file in the project root:

```env
# Required
DB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development

# Optional (defaults to 8000)
PORT=8000
```

For MongoDB Atlas, use your connection string:
```env
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerce
```

### Running the Server

```bash
# Development mode (auto-reload with nodemon)
npm run dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:8000/api/v1/`.

> **Optional:** Seed the database with dummy data:
> ```bash
> node utils/dummyData/seeder.js
> ```

---

## API Endpoints

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/categories` | Create a category |
| `GET` | `/api/v1/categories` | Get all categories |
| `GET` | `/api/v1/categories/:id` | Get a single category |
| `PUT` | `/api/v1/categories/:id` | Update a category |
| `DELETE` | `/api/v1/categories/:id` | Delete a category |

### Sub-Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/subcategories` | Create a sub-category |
| `GET` | `/api/v1/subcategories` | Get all sub-categories |
| `GET` | `/api/v1/subcategories/:id` | Get a single sub-category |
| `PUT` | `/api/v1/subcategories/:id` | Update a sub-category |
| `DELETE` | `/api/v1/subcategories/:id` | Delete a sub-category |
| `GET` | `/api/v1/categories/:categoryId/subcategories` | Get sub-categories for a category |

### Brands

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/brands` | Create a brand |
| `GET` | `/api/v1/brands` | Get all brands |
| `GET` | `/api/v1/brands/:id` | Get a single brand |
| `PUT` | `/api/v1/brands/:id` | Update a brand |
| `DELETE` | `/api/v1/brands/:id` | Delete a brand |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/products` | Create a product |
| `GET` | `/api/v1/products` | Get all products |
| `GET` | `/api/v1/products/:id` | Get a single product |
| `PUT` | `/api/v1/products/:id` | Update a product |
| `DELETE` | `/api/v1/products/:id` | Delete a product |

---

## Query Parameters

The `GET /api/v1/products` endpoint supports the following query parameters:

| Parameter | Example | Description |
|-----------|---------|-------------|
| `page` | `?page=2` | Page number (default: 1) |
| `limit` | `?limit=20` | Items per page (default: 50) |
| `sort` | `?sort=price,-createdAt` | Sort by field(s); prefix with `-` for descending |
| `fields` | `?fields=name,price,image` | Return only selected fields |
| `keyword` | `?keyword=laptop` | Search in name and description |
| `price[gte]` | `?price[gte]=100` | Filter by minimum price |
| `price[lte]` | `?price[lte]=5000` | Filter by maximum price |
| `ratingsAverage[gte]` | `?ratingsAverage[gte]=4` | Filter by minimum rating |

These parameters can be combined:
```
GET /api/v1/products?keyword=phone&price[lte]=1000&sort=-ratingsAverage&page=1&limit=10
```

---

## Error Handling

All errors are returned as JSON with the following shape:

```json
{
  "status": "fail",
  "message": "Human-readable error message"
}
```

In **development** mode, the response also includes a `stack` field with the full stack trace.

Common HTTP status codes:

| Code | Meaning |
|------|---------|
| `400` | Bad Request – validation error |
| `404` | Not Found – resource does not exist |
| `500` | Internal Server Error |
