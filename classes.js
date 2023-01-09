class ProductManager {
  title;
  description;
  price;
  thumbnail;
  code;
  stock;

  constructor() {
    this.products = [];
  }

  setProductId() {
    let id = 0;
    this.products.forEach((p) => {
      p.id = id;
      id++;
    });
    return id;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.some((p) => p.code === code)) {
      return console.log("Product already exists");
    } else {
      if (title && description && price && thumbnail && code && stock) {
        return this.products.push({
          id: this.setProductId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
      } else return console.log("Please fill all the fields");
    }
  }

  getProducts() {
    if (this.products.length === 0) {
      return console.log("No products");
    } else return console.log(this.products);
  }

  getProductById(id) {
    if (!this.products[id]) return console.log("Not found");
    else return console.log(this.products[id]);
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Teclado",
  "Teclado Mecánico",
  1340,
  "imagen",
  "RF324",
  6
);

productManager.addProduct(
  "Mouse",
  "Mouse Gamer",
  340,
  "imagen",
  "RF325",
  3
);

productManager.getProductById(1);
