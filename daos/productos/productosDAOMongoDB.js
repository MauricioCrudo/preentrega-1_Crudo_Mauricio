import { ContenedorMongoDB } from "../../contenedores/contenedorMongoDb.js";
import { productModel } from "../../MongoDB/models/products.js";
class ProductosDAOMongoDB extends ContenedorMongoDB {
	constructor() {
		super("productos");
	}
	async save(item) {
		try {
			const arr = await productModel.find();
			const id = arr.length + 1;
			item.id = id;
			const itemModel = new productModel(item);
			await itemModel.save().then((document) => console.log(document));
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			const arr = await productModel.find();
			return arr;
		} catch (error) {
			console.log(error);
		}
	}
	async getById(id) {
		try {
			const item = await productModel.findOne({ id: id });
			return item;
		} catch (error) {
			console.log(error);
		}
	}
	async deleteById(id) {
		await productModel.findOneAndDelete({ id: id });
	}
	async deleteAll() {
		await productModel.deleteMany({});
	}
}

export { ProductosDAOMongoDB };
