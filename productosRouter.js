import { Router } from "express";
import { Container } from "./classes.js";
const prodRouter = Router();

const productos = new Container("productos");
prodRouter.use((req, res, next) => {
	console.log(`request recibido a router de productos`);
	return next();
});

prodRouter.get("/", async (req, res) => {
	const prodList = await productos.getAll();
	return res.json(prodList);
});
prodRouter.get("/:id", async (req, res) => {
	const id = Number(req.params.id);
	let content = await productos.getById(id);
	content
		? res.json(content)
		: res.json({ error: "no se encontro el producto" });
});

prodRouter.post("", async (req, res) => {
	const admin = req.body.admin;
	if (admin) {
		const content = await productos.getAll();
		const id = content.length + 1;
		const newItem = {
			title: req.body.title,
			price: req.body.price,
			desc: req.body.desc,
			thumbnail: req.body.thumbnail,
			stock: req.body.stock,
			id: id,
			timestamp: Date.now(),
		};
		await productos.save(newItem);
		res.json(newItem);
	} else {
		res.json({ error: "se requiere ser admin" });
	}
});
prodRouter.put("/:id", async (req, res) => {
	const admin = req.body.admin;
	if (admin) {
		const id = Number(req.params.id);
		const oldItem = productos.getById(id);
		if (!oldItem) {
			return res.json({ error: "producto no encontrado" });
		} else {
			await productos.deleteById(id);
			oldItem.title = req.body.title || oldItem.title;
			oldItem.price = req.body.price || oldItem.price;
			oldItem.desc = req.body.desc || oldItem.desc;
			oldItem.thumbnail = req.body.thumbnail || oldItem.desc;
			oldItem.stock = req.body.stock || oldItem.stock;
			oldItem.id = id;
			oldItem.timestamp = Date.now();
			await productos.save(oldItem);
			return res.json(oldItem);
		}
	} else {
		console.log(`se requiere ser administrador para realizar esta funcion`);
		res.json({ error: "se requiere ser admin" });
	}
});
prodRouter.delete("/:id", async (req, res) => {
	const admin = req.body.admin;
	if (admin) {
		const id = Number(req.params.id);
		const deletedItem = await productos.getById(id);
		await productos.deleteById(id);
		return res.json(deletedItem);
	} else {
		console.log("se requiere ser administrador para realizar esta funcion");
		res.json({ error: "se requiere ser admin" });
	}
});

export { productos, prodRouter };
