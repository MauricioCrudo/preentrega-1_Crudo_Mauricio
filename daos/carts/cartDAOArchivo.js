const { ContainerFs } = require("../../contenedores/contenedorArchivo");

class CartDAOArchivo extends ContainerFs {
	constructor() {
		super("cart");
	}
}
