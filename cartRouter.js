import { Router } from "express";
import { ContainerFs } from "./contenedores/contenedorArchivo.js";
import { CartDAOMongoDB } from "./daos/carts/cartDAOMongoDB.js";
import { CartDAOFirebase } from "./daos/carts/cartDAOFirebase.js";
import { productos } from "./productosRouter.js";

const cartRouter = new Router();
const cart = new CartDAOMongoDB();

cartRouter.post("", async (req, res) => {
	const allCarts = await cart.getAll();
	const id = allCarts.length + 1;
	const newCart = {
		id: id,
		timestamp: Date.now(),
		products: [{ prueba: "prueba1" }],
	};
	await cart.save(newCart);
	res.json(newCart);
});

cartRouter.delete("/:id", async (req, res) => {
	const id = Number(req.params.id);
	const deletedItem = await cart.getById(id);
	if (deletedItem) {
		await cart.deleteById(id);
		res.json(deletedItem);
	} else {
		res.json({ error: "no se encontro el carrito" });
	}
});

cartRouter.get("/:id/productos", async (req, res) => {
	const id = Number(req.params.id);
	const thisCart = await cart.getById(id);
	if (thisCart) {
		const products = thisCart.productos;
		res.json(products);
	} else {
		res.json({ error: "no se encuentra este carrito" });
	}
});
cartRouter.post("/:id/productos", async (req, res) => {
	const id = Number(req.params.id);
	const prodId = req.body.id;
	const newProduct = await productos.getById(prodId);
	await cart.updateById(id, newProduct);
	res.json(newProduct);
});
cartRouter.delete("/:id/productos/:prod_id", async (req, res) => {
	const cartId = Number(req.params.id);
	const prodId = Number(req.params.prod_id);
	const thisCart = await cart.getById(cartId);
	if (thisCart) {
		const filter = thisCart.products.filter((item) => item.id !== prodId);
		thisCart.products = filter;
		await cart.deleteById(cartId);
		await cart.save(thisCart);
		res.json({ completado: `se elimino el producto con id ${prodId}` });
	} else {
		res.json({ error: "no se encuentra este carrito" });
	}
});
cartRouter.get("/productos", async (req, res) => {
	const all = await productos.getAll();
	const allCarts = await cart.getAll();
	res.json(all);
});
cartRouter.get;
export { cartRouter };
