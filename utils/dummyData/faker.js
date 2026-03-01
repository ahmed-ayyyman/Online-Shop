const { faker } = require("@faker-js/faker");
const slugify = require("slugify");
const fs = require("fs");

// 1. Data extracted from your provided JSON files
const existingData = {
  brandId: "69a03c12e83c0b5f3894ac2f", // Adiddas
  categories: [
    { id: "699eecfec094e6ed4f0223ee", name: "Electronics" }, //
    { id: "699eed08c094e6ed4f0223f0", name: "Fashion" }, //
    { id: "699eed16c094e6ed4f0223f6", name: "Sports" }, //
  ],
  subCategories: [
    { id: "699eee72c094e6ed4f0223f9", name: "Mobile Phones" }, //
    { id: "699eeea2c094e6ed4f022403", name: "Men Clothing" }, //
    { id: "699eeebfc094e6ed4f022417", name: "Gym Equipment" }, //
  ],
};

// 2. Generation Logic
const generateProducts = (num = 50) => {
  const products = [];

  for (let i = 0; i < num; i++) {
    const name =
      faker.commerce.productName() + " " + faker.string.alphanumeric(3);
    const price = parseFloat(faker.commerce.price({ min: 100, max: 1000 }));

    // Logic to ensure priceAfterDiscount < price
    const priceAfterDiscount = price - price * 0.1;

    // Randomly pick a category and a matching subcategory for realism
    const categoryIndex = faker.number.int({ min: 0, max: 2 });

    const product = {
      name: name,
      slug: slugify(name, { lower: true }), // Required by schema
      description: faker.commerce.productDescription(), // Max 2000 chars
      quantity: faker.number.int({ min: 1, max: 500 }),
      sold: faker.number.int({ min: 0, max: 100 }),
      price: price,
      priceAfterDiscount: priceAfterDiscount,
      colors: [faker.color.human(), faker.color.human()],
      imageCover: `product-${i}-cover.png`, // Required field
      images: [`product-${i}-1.png`, `product-${i}-2.png`],
      category: existingData.categories[categoryIndex].id, // Relational link (as string)
      subCategories: [existingData.subCategories[categoryIndex].id],
      brand: existingData.brandId,
      ratingsAverage: faker.number.float({ min: 1, max: 5, precision: 0.1 }), // Set logic
      ratingsQuantity: faker.number.int({ min: 0, max: 50 }),
    };

    products.push(product);
  }

  return products;
};

// 3. Save to file
const mockProducts = generateProducts(50);
fs.writeFileSync(
  "e-commerce-db.products.json",
  JSON.stringify(mockProducts, null, 2),
);
console.log("Successfully generated 50 mock products!");
