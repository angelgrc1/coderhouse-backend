import fs from "fs";
import productManager from "./productManager.js";

class CartManager {
  path;

  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    const carts = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  }

  async newId() {
    let carts = await this.getCarts();
    if (carts.length == 0) {
      return 1;
    } else {
      return carts[carts.length - 1].id + 1;
    }
  }

  async newCart(cart) {
    let carts = await this.getCarts();
    carts.push({
      id: await this.newId(),
      products: cart.products ? cart.products : [],
    });
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
  }

  async getCartById(cid) {
    const carts = await this.getCarts();
    const index = carts.findIndex((cart) => cart.id === parseInt(cid));
    if (index === -1) throw new Error("Cart not found");
    return carts[index];
  }

  async addProductToCart(cid, pid, quantity) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid));
    if (cartIndex === -1) throw new Error("Cart not found");
    const product = await productManager.getProductById(pid);
    if (!product) throw new Error("Product not found");
    if (product.stock < quantity) throw new Error("Not enough stock");
    if (!quantity) throw new Error("Please fill quantity field");
    carts[cartIndex].products.push({ product: product.id, quantity: quantity });
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
  }
}

const cartManager = new CartManager("./db/carts.json");

export default cartManager;
