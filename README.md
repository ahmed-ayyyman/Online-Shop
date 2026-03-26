# Online Shop API

A RESTful API backend for an e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. It provides full CRUD operations for products, categories, subcategories, and brands, along with filtering, searching, sorting, pagination, and input validation.

---

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

- Full **CRUD** operations for Products, Categories, Subcategories, and Brands
- **Image upload** for categories with automatic resizing and JPEG conversion via Multer + Sharp
- **Nested routes** — list subcategories scoped to a parent category (`/categories/:categoryId/subcategories`)
- **Reusable factory handlers** (`handlersFactory.js`) for DRY controller logic across all resources
- **Filtering** with comparison operators (`gt`, `gte`, `lt`, `lte`)
- **Full-text search** on product name and description
- **Sorting** by any field (ascending/descending)
- **Field selection** to limit response payloads
- **Pagination** with configurable page size
- **Input validation** with detailed error messages
- **Global error handling** with separate development and production modes
- **Slug generation** for SEO-friendly URLs
- **Discount price** validation (must be less than original price)
- **Graceful shutdown** on unhandled promise rejections

---

## Tech Stack

| Layer            | Technology                      |
|------------------|---------------------------------|
| Runtime          | Node.js                         |
| Framework        | Express.js 4.x                  |
| Database         | MongoDB (Mongoose ODM)          |
| Validation       | express-validator               |
| Logging          | Morgan                          |
| Config           | dotenv                          |
| Slugs            | slugify                         |
| Async errors     | express-async-handler           |
| File uploads     | Multer                          |
| Image processing | Sharp                           |
| Unique IDs       | uuid                            |
| Dev server       | Nodemon                         |
| Testing          | Jest + Supertest                |
=======
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | express-validator |
| Dev Server | nodemon |
| Testing | Jest + Supertest |
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a

---

## Project Structure

```
Online-Shop/
├── config/
<<<<<<< HEAD
│   └── database.js          # MongoDB connection
├── middlewares/
│   ├── errorMiddleware.js   # Global error handler
│   └── validatorMiddleware.js
├── models/
│   ├── productModel.js
│   ├── categoryModel.js
│   ├── brandModel.js
│   └── subCategoryModel.js
├── routes/
│   ├── productRoute.js
│   ├── categoryRoute.js
│   ├── brandRoute.js
│   └── subCategoryRoute.js
├── services/                # Business logic / controllers
│   ├── handlersFactory.js   # Reusable CRUD factory handlers
│   ├── productService.js
│   ├── categoryService.js
│   ├── brandService.js
│   └── subCategoryService.js
├── uploads/
│   └── categories/          # Uploaded & processed category images
├── utils/
│   ├── apiError.js          # Custom error class
│   ├── apiFeatures.js       # Filtering, sorting, pagination, search
│   ├── dummyData/           # Database seed scripts
│   │   ├── faker.js
│   │   ├── seeder.js
│   │   └── e-commerce-db.products.json
│   └── validators/          # Request validation schemas
│       ├── productValidator.js
│       ├── categoryValidator.js
│       ├── brandValidator.js
│       └── subCategoryValidator.js
├── server.js                # App entry point
├── package.json
└── config.env               # Environment variables (not committed)
=======
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
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a
```

---

<<<<<<< HEAD
## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) v6 or higher
- A running [MongoDB](https://www.mongodb.com/) instance (local or cloud, e.g., MongoDB Atlas)

---

## Getting Started

1. **Clone the repository**

=======
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) v6 or higher
- A running [MongoDB](https://www.mongodb.com/) instance (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository:**
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a
   ```bash
   git clone https://github.com/ahmed-ayyyman/Online-Shop.git
   cd Online-Shop
   ```

<<<<<<< HEAD
2. **Install dependencies**

=======
2. **Install dependencies:**
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a
   ```bash
   npm install
   ```

<<<<<<< HEAD
3. **Configure environment variables**

   Create a `config.env` file in the project root (see [Environment Variables](#environment-variables)):

   ```bash
   cp config.env.example config.env   # if an example file exists, otherwise create manually
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:8000`.

---

## Environment Variables

Create a `config.env` file in the project root with the following variables:

| Variable    | Description                           | Default       |
|-------------|---------------------------------------|---------------|
| `PORT`      | Port the server listens on            | `8000`        |
| `NODE_ENV`  | Application environment               | `development` |
| `DB_URI`    | MongoDB connection string             | *(required)*  |

**Example `config.env`:**

```env
PORT=8000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/online-shop
```

> **Note:** `config.env` is listed in `.gitignore` and must never be committed to version control.

---

## Running the Application

| Command              | Description                                  |
|----------------------|----------------------------------------------|
| `npm run dev`        | Start with Nodemon (auto-restarts on change) |
| `npm run start:prod` | Start in production mode (no auto-restart)   |

---

## API Reference

Base URL: `http://localhost:8000/api/v1`

All responses are in JSON format.

---

### Categories

| Method | Endpoint                                    | Description                              |
|--------|---------------------------------------------|------------------------------------------|
| GET    | `/categories`                               | Get all categories                       |
| GET    | `/categories/:id`                           | Get a single category                    |
| POST   | `/categories`                               | Create a new category (supports image upload) |
| PUT    | `/categories/:id`                           | Update a category                        |
| DELETE | `/categories/:id`                           | Delete a category                        |
| GET    | `/categories/:categoryId/subcategories`     | Get all subcategories for a category     |
| POST   | `/categories/:categoryId/subcategories`     | Create a subcategory under a category    |

**Create/Update body** (`multipart/form-data` or JSON):
```json
{
  "name": "Electronics",
  "image": "<file>"
}
```

> **Note:** When uploading an image, send the request as `multipart/form-data` with the file in the `image` field. The image is automatically resized to 600×600 px and saved as JPEG.

---

### Subcategories

| Method | Endpoint                      | Description                |
|--------|-------------------------------|----------------------------|
| GET    | `/subcategories`              | Get all subcategories      |
| GET    | `/subcategories/:id`          | Get a single subcategory   |
| POST   | `/subcategories`              | Create a new subcategory   |
| PUT    | `/subcategories/:id`          | Update a subcategory       |
| DELETE | `/subcategories/:id`          | Delete a subcategory       |

> Subcategories can also be accessed via the nested route `/categories/:categoryId/subcategories` (see [Categories](#categories)).

**Create/Update body:**
```json
{
  "name": "Smartphones",
  "category": "<categoryId>"
}
```

---

### Brands

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/brands`             | Get all brands       |
| GET    | `/brands/:id`         | Get a single brand   |
| POST   | `/brands`             | Create a new brand   |
| PUT    | `/brands/:id`         | Update a brand       |
| DELETE | `/brands/:id`         | Delete a brand       |

**Create/Update body:**
```json
{
  "name": "Samsung"
}
```

---

### Products

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| GET    | `/products`           | Get all products       |
| GET    | `/products/:id`       | Get a single product   |
| POST   | `/products`           | Create a new product   |
| PUT    | `/products/:id`       | Update a product       |
| DELETE | `/products/:id`       | Delete a product       |

**Create/Update body:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "Apple flagship smartphone",
  "price": 999,
  "priceAfterDiscount": 899,
  "quantity": 100,
  "imageCover": "iphone15pro.jpg",
  "images": ["img1.jpg", "img2.jpg"],
  "colors": ["Black", "Silver", "Gold"],
  "category": "<categoryId>",
  "subCategories": ["<subCategoryId>"],
  "brand": "<brandId>"
}
```

**Single product response** (includes populated references):
```json
{
  "data": {
    "_id": "...",
    "name": "iPhone 15 Pro",
    "slug": "iphone-15-pro",
    "price": 999,
    "priceAfterDiscount": 899,
    "ratingsAverage": 4.5,
    "ratingsQuantity": 120,
    "category": { "_id": "...", "name": "Electronics" },
    "brand": { "_id": "...", "name": "Apple" },
    ...
  }
}
```
=======
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
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a

---

## Query Parameters

<<<<<<< HEAD
The following query parameters are supported on all **list** endpoints (e.g., `GET /products`):

| Parameter | Description                                              | Example                          |
|-----------|----------------------------------------------------------|----------------------------------|
| `page`    | Page number (default: `1`)                               | `?page=2`                        |
| `limit`   | Results per page (default: `10`; `50` for products)      | `?limit=10`                      |
| `sort`    | Comma-separated fields to sort by (`-` for descending)   | `?sort=-price,name`              |
| `fields`  | Comma-separated fields to include in response            | `?fields=name,price`             |
| `keyword` | Search term matched against name and description         | `?keyword=apple`                 |
| *field*   | Filter by any model field; supports `gt`, `gte`, `lt`, `lte` | `?price[gte]=100&price[lte]=500` |

**Paginated list response format:**
```json
{
  "results": 10,
  "totalResults": 150,
  "totalPages": 15,
  "page": 1,
  "data": [...]
}
=======
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
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a
```

---

## Error Handling

<<<<<<< HEAD
All errors return a consistent JSON structure:
=======
All errors are returned as JSON with the following shape:
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a

```json
{
  "status": "fail",
<<<<<<< HEAD
  "message": "Descriptive error message"
}
```

In **development** mode, the response also includes a `stack` trace.

Common HTTP status codes used:

| Status | Meaning                          |
|--------|----------------------------------|
| 400    | Bad request / validation error   |
| 404    | Resource not found               |
| 500    | Internal server error            |

---

## Data Models

### Product

| Field                | Type       | Required | Notes                                  |
|----------------------|------------|----------|----------------------------------------|
| `name`               | String     | ✅        | 2–128 characters, unique               |
| `slug`               | String     |          | Auto-generated from name               |
| `description`        | String     |          | Max 2000 characters                    |
| `price`              | Number     | ✅        |                                        |
| `priceAfterDiscount` | Number     |          | Must be less than `price`              |
| `quantity`           | Number     |          | Default: 0                             |
| `sold`               | Number     |          | Default: 0                             |
| `imageCover`         | String     | ✅        | Main product image                     |
| `images`             | [String]   |          | Additional product images              |
| `colors`             | [String]   |          | Available color variants               |
| `category`           | ObjectId   | ✅        | Reference to Category                  |
| `subCategories`      | [ObjectId] |          | References to SubCategory              |
| `brand`              | ObjectId   |          | Reference to Brand                     |
| `ratingsAverage`     | Number     |          | 1.0–5.0, rounded to 1 decimal          |
| `ratingsQuantity`    | Number     |          | Default: 0                             |

### Category

| Field  | Type   | Required | Notes                          |
|--------|--------|----------|--------------------------------|
| `name` | String | ✅        | 3–32 characters, unique        |
| `slug` | String |          | Auto-generated from name       |
| `image`| String |          | Filename of uploaded image     |

### Brand

| Field  | Type   | Required | Notes                          |
|--------|--------|----------|--------------------------------|
| `name` | String | ✅        | 3–32 characters, unique        |
| `slug` | String |          | Auto-generated from name       |
| `image`| String |          | Brand image filename           |

### SubCategory

| Field      | Type     | Required | Notes                    |
|------------|----------|----------|--------------------------|
| `name`     | String   | ✅        | Unique                   |
| `slug`     | String   |          | Auto-generated from name |
| `category` | ObjectId | ✅        | Reference to Category    |

---

## Scripts

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm run start:prod
```

---

## Testing

The project uses [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for testing.

```bash
# Run all tests
npm test
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the **ISC License**.
=======
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
>>>>>>> 3d99582202129bb9131a5b478784c6106f4ff10a
