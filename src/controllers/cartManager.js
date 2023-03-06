import {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductInCartService,
} from "../services/cart.service.js";
import { getProductsService } from "../services/product.service.js";

const getCart = async (id) => {
  try {
    const cart = await getCartService(id);
    const products = await getProductsService();
    const findProducts = [];
    cart.products.forEach((productId) => {
      const product = products.find(
        (product) => product._id.toString() === productId
      );
      if (product) {
        findProducts.push(product);
      }
    });
    const formatCart = { ...cart, products: findProducts };
    return formatCart;
  } catch (error) {
    throw Error(error);
  }
};

const createCart = async () => {
  try {
    const newCart = await createCartService();
    return newCart;
  } catch (error) {
    throw Error(error);
  }
};

const addProductToCart = async (cartId, productId) => {
  try {
    const result = await addProductToCartService(cartId, productId);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteProductInCart = async (cartId, productId) => {
  try {
    const result = await deleteProductInCartService(cartId, productId);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export { getCart, createCart, addProductToCart, deleteProductInCart };
