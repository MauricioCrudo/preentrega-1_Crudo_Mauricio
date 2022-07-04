const { ContainerFs } = require("../../contenedores/contenedorArchivo");

class ProductosDAOArchivo extends ContainerFs {
	constructor() {
		super("products");
	}
}
