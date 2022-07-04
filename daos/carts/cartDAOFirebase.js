import db from "../../Firebase/firebase.js";
import { ContenedorFirebase } from "../../contenedores/contenedorFirebase.js";

class CartDAOFirebase extends ContenedorFirebase {
	constructor() {
		super("Carts");
	}
}
export { CartDAOFirebase };
