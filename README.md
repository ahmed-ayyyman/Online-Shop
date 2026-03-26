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
- [API Reference](#api-reference)
  - [Base URL](#base-url)
  - [Categories](#categories)
  - [Subcategories](#subcategories)
  - [Brands](#brands)
  - [Products](#products)
  - [Users](#users)
- [Query Parameters](#query-parameters)
- [Error Handling](#error-handling)
- [License](#license)

---

## Features
- Full **CRUD** operations for Products, Categories, Subcategories, Brands, and Users
- **Image upload & processing**
  - Category image upload + resize
  - Brand image upload + resize
- **Nested routes**
  - List / create subcategories under a category:
    - `GET /api/v1/categories/:categoryId/subcategories`
    - `POST /api/v1/categories/:categoryId/subcategories`
- **Advanced querying**
  - Filtering with comparison operators (`gt`, `gte`, `lt`, `lte`)
  - Search with `keyword`
  - Sorting with `sort`
  - Field selection with `fields`
  - Pagination with `page` and `limit`

---

## Tech Stack
- Runtime: **Node.js**
- Framework: **Express.js (4.x)**
- Database: **MongoDB** (via **Mongoose**)
- Validation: **express-validator**
- Logging: **morgan**
- Env: **dotenv**
- File uploads: **multer**
- Image processing: **sharp**
- Slugs: **slugify**
- Dev server: **nodemon**
- Testing: **Jest**, **Supertest**

---

## Project Structure
```
Online-Shop/
├── config/
│   └── database.js
├── middlewares/
│   ├── errorMiddleware.js
│   └── validatorMiddleware.js
├── models/
├── routes/
│   ├── categoryRoute.js
│   ├── subCategoryRoute.js
│   ├── brandRoute.js
│   ├── productRoute.js
│   └── userRoute.js
├── services/
├── uploads/
├── utils/
│   ├── apiError.js
│   ├── apiFeatures.js
│   ├── dummyData/
│   └── validators/
├── server.js
├── package.json
└── config.env
```

---

## Getting Started

### Prerequisites
- Node.js (recommended: v14+)
- npm
- MongoDB (local or MongoDB Atlas)

### Installation
```bash
git clone https://github.com/ahmed-ayyyman/Online-Shop.git
cd Online-Shop
npm install
```

### Environment Variables
This project loads env vars from `config.env` (see `server.js`).

Create a `config.env` file in the project root:
```env
# Required
DB_URI=mongodb://localhost:27017/online-shop

# Optional
PORT=8000
NODE_ENV=development
```

> `DB_URI` is required because the database connection uses `process.env.DB_URI` in `config/database.js`.

### Running the Server
```bash
# Development (nodemon)
npm run dev

# Production
npm run start:prod
```

The server will run on:
- `http://localhost:8000` (by default)

---

## API Reference

### Base URL
All routes are mounted under:
- `http://localhost:8000/api/v1`

### Categories
Mounted at: `/api/v1/categories`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | List categories |
| POST | `/categories` | Create category (supports image upload) |
| GET | `/categories/:id` | Get category by id |
| PUT | `/categories/:id` | Update category (supports image upload) |
| DELETE | `/categories/:id` | Delete category |
| GET | `/categories/:categoryId/subcategories` | List subcategories for category (nested) |
| POST | `/categories/:categoryId/subcategories` | Create subcategory under category (nested) |

**Create/Update body (JSON or multipart/form-data):**
```json
{
  "name": "Electronics"
}
```

### Subcategories
Mounted at: `/api/v1/subcategories`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/subcategories` | List subcategories (supports filtering by category via nested route) |
| POST | `/subcategories` | Create subcategory |
| GET | `/subcategories/:id` | Get subcategory by id |
| PUT | `/subcategories/:id` | Update subcategory |
| DELETE | `/subcategories/:id` | Delete subcategory |

**Create body:**
```json
{
  "name": "Smartphones",
  "category": "<categoryId>"
}
```

> When using the nested route `POST /categories/:categoryId/subcategories`, the API sets `category` automatically from `:categoryId`.

### Brands
Mounted at: `/api/v1/brands`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/brands` | List brands |
| POST | `/brands` | Create brand (supports image upload) |
| GET | `/brands/:id` | Get brand by id |
| PUT | `/brands/:id` | Update brand (supports image upload) |
| DELETE | `/brands/:id` | Delete brand |

**Create/Update body (JSON or multipart/form-data):**
```json
{
  "name": "Samsung"
}
```

### Products
Mounted at: `/api/v1/products`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | List products (supports filtering/search/sort/pagination/field limiting) |
| POST | `/products` | Create product |
| GET | `/products/:id` | Get product by id |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Users
Mounted at: `/api/v1/users`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | List users |
| POST | `/users` | Create user |
| GET | `/users/:id` | Get user by id |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| PUT | `/users/updateUserPassword/:id` | Update a user’s password |

---

## Query Parameters

The API supports these query parameters for list endpoints using the `ApiFeatures` utility (`utils/apiFeatures.js`):

### Pagination
- `page` (default: `1`)
- `limit` (default: `50`)

Example:
```
GET /api/v1/products?page=2&limit=10
```

### Sorting
- `sort`: comma-separated fields  
  - prefix a field with `-` for descending

Example:
```
GET /api/v1/products?sort=-price,createdAt
```

### Field limiting
- `fields`: comma-separated list of fields to include

Example:
```
GET /api/v1/products?fields=name,price,description
```

### Search
- `keyword`: searches by regex (case-insensitive)
  - For **Product**: searches in `name` and `description`
  - For other models: searches in `name`

Example:
```
GET /api/v1/products?keyword=iphone
```

### Filtering (Mongo-style operators)
Supports:
- `gte`, `gt`, `lte`, `lt`

Example:
```
GET /api/v1/products?price[gte]=100&price[lte]=500
```

---

## Error Handling

Errors use a consistent shape based on `utils/apiError.js`:

```json
{
  "status": "fail",
  "message": "Human-readable error message"
}
```

---

## License
ISC
