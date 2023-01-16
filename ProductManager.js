const fs = require("fs");

class ProductManager {
  path;

  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    const products = await this.getProducts();
    if (!products) return console.log("Not found");
    else return console.log(products);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    if (!products[id]) return console.log("Not found");
    else return console.log(products[id]);
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    let products = await this.getProducts();

    const setProductId = () => {
      let id = 0;
      products.forEach((p) => {
        p.id = id;
        id++;
      });
      return id;
    };

    if (products.some((p) => p.code === code)) {
      return console.log("Product already exists");
    } else {
      if (title && description && price && thumbnail && code && stock) {
        let newProduct = {
          id: setProductId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return console.log("Product added");
      } else return console.log("Please fill all the fields");
    }
  }

  async deleteProductById(id) {
    const products = await this.getProducts();
    if (!products[id]) return console.log("Not found");
    else {
      products.splice(id, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return console.log("Product deleted");
    }
  }

  async updateProductById(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) {
    const products = await this.getProducts();
    if (!products[id]) return console.log("Not found");
    else {
      if (title) products[id].title = title;
      if (description) products[id].description = description;
      if (price) products[id].price = price;
      if (thumbnail) products[id].thumbnail = thumbnail;
      if (code) products[id].code = code;
      if (stock) products[id].stock = stock;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return console.log("Product updated");
    }
  }
}

const productManager = new ProductManager("products.json");

productManager.updateProductById(
  9,
  "New title",
  "New description",
  100,
  "New thumbnail",
  "New code",
  100
);
