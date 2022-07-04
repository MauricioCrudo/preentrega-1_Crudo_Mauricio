import { ProductosDAOMongoDB } from "./productos/productosDAOMongoDB.js";

const getStorage = () => {
	const storage = process.env.STORAGE || "archivo";
	switch (storage) {
		case "archivo":
			return {
				products: new ProductosDAOArchivo(),
				cart: new CartDAOArchivo(),
			};
			break;
		case "mongodb":
			return {
				products: new ProductosDAOMongoDB(),
				cart: new CartDAOMongoDB(),
			};
			break;
		case "firebase":
			return {
				products: new ProductosDAOFirebase(),
				cart: new CartDAOFirebase(),
			};
		default:
			return {
				products: new ProductosDAOMongoDB(),
				cart: new CartDAOMongoDB(),
			};
			break;
	}
};

module.exports = getStorage;
