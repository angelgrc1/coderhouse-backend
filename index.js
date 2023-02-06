import httpServer from "./src/socket.js";

const PORT = process.env.PORT || 3000;

httpServer
  .listen(PORT, () => {
    console.log(`Server listening in PORT:${PORT}`);
  })
  .on("error", (error) => console.log(error));
