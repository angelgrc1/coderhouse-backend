import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import productManager from "./controllers/product.controller.js";

const httpServer = http.createServer(app);
const io = new Server(httpServer);

let products = [];

(async function () {
  products = await productManager.getProducts();
})();

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("all products", products);
});

export default httpServer;
