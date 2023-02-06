import fs from "fs";

class ProductManager {
  path;

  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    const products = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(products);
  }

  async newId() {
    let products = await this.getProducts();
    if (products.length == 0) {
      return 1;
    } else {
      return products[products.length - 1].id + 1;
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const findProduct = products.find((product) => product.id === parseInt(id));
    if (!findProduct) throw new Error("Product not found");
    return findProduct;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const products = await this.getProducts();
    if (!title || !description || !price || !thumbnail || !code || !stock)
      throw new Error("Please fill all the fields");
    if (products.some((p) => p.code === code))
      throw new Error("Code already exists");
    let newProduct = {
      id: await this.newId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }

  async deleteProductById(id) {
    const products = await this.getProducts();
    if (!products[id]) throw new Error("Product not found");
    else {
      products.splice(id, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
  }

  async updateProductById(id, body) {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === parseInt(id));
    if (!product) throw new Error("Product not found");
    else {
      product.title = body.title || product.title;
      product.description = body.description || product.description;
      product.price = body.price || product.price;
      product.thumbnail = body.thumbnail || product.thumbnail;
      product.code = body.code || product.code;
      product.stock = body.stock || product.stock;
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
  }
}

const productManager = new ProductManager("./db/products.json");

export default productManager;
