# Online Shop API

A RESTful API backend for an e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. It provides full CRUD operations for products, categories, subcategories, and brands, along with filtering, searching, sorting, pagination, and input validation.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Reference](#api-reference)
  - [Categories](#categories)
  - [Subcategories](#subcategories)
  - [Brands](#brands)
  - [Products](#products)
- [Query Parameters](#query-parameters)
- [Error Handling](#error-handling)
- [Data Models](#data-models)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Full **CRUD** operations for Products, Categories, Subcategories, and Brands
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

| Layer        | Technology                      |
|--------------|---------------------------------|
| Runtime      | Node.js                         |
| Framework    | Express.js 4.x                  |
| Database     | MongoDB (Mongoose ODM)          |
| Validation   | express-validator               |
| Logging      | Morgan                          |
| Config       | dotenv                          |
| Slugs        | slugify                         |
| Async errors | express-async-handler           |
| Dev server   | Nodemon                         |
| Testing      | Jest + Supertest                |

---

## Project Structure

```
Online-Shop/
├── config/
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
│   ├── productService.js
│   ├── categoryService.js
│   ├── brandService.js
│   └── subCategoryService.js
├── utils/
│   ├── apiError.js          # Custom error class
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
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- [npm](https://www.npmjs.com/) v6 or higher
- A running [MongoDB](https://www.mongodb.com/) instance (local or cloud, e.g., MongoDB Atlas)

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmed-ayyyman/Online-Shop.git
   cd Online-Shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

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

| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | `/categories`             | Get all categories      |
| GET    | `/categories/:id`         | Get a single category   |
| POST   | `/categories`             | Create a new category   |
| PUT    | `/categories/:id`         | Update a category       |
| DELETE | `/categories/:id`         | Delete a category       |

**Create/Update body:**
```json
{
  "name": "Electronics"
}
```

---

### Subcategories

| Method | Endpoint                      | Description                |
|--------|-------------------------------|----------------------------|
| GET    | `/subcategories`              | Get all subcategories      |
| GET    | `/subcategories/:id`          | Get a single subcategory   |
| POST   | `/subcategories`              | Create a new subcategory   |
| PUT    | `/subcategories/:id`          | Update a subcategory       |
| DELETE | `/subcategories/:id`          | Delete a subcategory       |

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

---

## Query Parameters

The following query parameters are supported on all **list** endpoints (e.g., `GET /products`):

| Parameter | Description                                              | Example                          |
|-----------|----------------------------------------------------------|----------------------------------|
| `page`    | Page number (default: `1`)                               | `?page=2`                        |
| `limit`   | Results per page (default: `50`)                         | `?limit=10`                      |
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
```

---

## Error Handling

All errors return a consistent JSON structure:

```json
{
  "status": "fail",
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

### Category / Brand

| Field  | Type   | Required | Notes                    |
|--------|--------|----------|--------------------------|
| `name` | String | ✅        | Unique                   |
| `slug` | String |          | Auto-generated from name |

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

# Run tests
npx jest
```

---

## Testing

The project uses **Jest** and **Supertest** for testing.

```bash
npx jest
```

To run tests with coverage:

```bash
npx jest --coverage
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
