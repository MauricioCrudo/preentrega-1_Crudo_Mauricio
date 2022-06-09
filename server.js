import express from "express";
import { cartRouter } from "./cartRouter.js";
import { prodRouter } from "./productosRouter.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", prodRouter);
app.use("/api/carrito", cartRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	console.log(`http server listening on ${PORT}`);
});
server.on("error", (error) => console.log(error));
