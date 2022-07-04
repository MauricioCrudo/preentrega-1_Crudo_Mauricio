import { ContenedorMongoDB } from "../../contenedores/contenedorMongoDb.js";
import { cartModel } from "../../MongoDB/models/cart.js";
class CartDAOMongoDB extends ContenedorMongoDB {
	constructor() {
		super("carts");
	}
	async save(item) {
		try {
			const arr = await cartModel.find();
			const id = arr.length + 1;
			item.id = id;
			const itemModel = new cartModel(item);
			await itemModel.save().then((document) => console.log(document));
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			const arr = await cartModel.find();
			return arr;
		} catch (error) {
			console.log(error);
		}
	}
	async getById(id) {
		try {
			const item = await cartModel.findOne({ id: id });
			return item;
		} catch (error) {
			console.log(error);
		}
	}
	async updateById(id, item) {
		const doc = await cartModel.findOne({ id: id });
		doc.productos.push(item);
		await doc.save();
	}
	async deleteById(id) {
		await cartModel.findOneAndDelete({ id: id });
	}
	async deleteAll() {
		await cartModel.deleteMany({});
	}
}

export { CartDAOMongoDB };
