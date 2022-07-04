import db from "../../Firebase/firebase.js";
import { ContenedorFirebase } from "../../contenedores/contenedorFirebase.js";

class ProductosDAOFirebase extends ContenedorFirebase {
	constructor() {
		super("Products");
	}
}
export { ProductosDAOFirebase };
