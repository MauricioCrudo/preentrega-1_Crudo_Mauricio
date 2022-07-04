import db from "../Firebase/firebase.js";
class ContenedorFirebase {
	constructor(name) {
		this.name = name;
	}
	async save(item) {
		const query = db.collection(`${this.name}`);
		try {
			await query.add(item);
			console.log(item);
		} catch (e) {
			console.log(e);
		}
	}
	async getAll() {
		const query = db.collection(`${this.name}`);
		try {
			const response = await query.get();
			const docs = response.docs;
			const arr = docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});
			return arr;
		} catch (e) {
			console.log(e);
		}
	}
	async getById(id) {
		try {
			const query = db.collection(`${this.name}`);
			const doc = query.doc(where("id", "==", `${id}`));
			const item = await doc.get();
			const response = item.data();
			return response;
		} catch (e) {
			console.log(e);
		}
	}
	async deleteById(id) {
		const query = db.collection(`$[this.name]`);
		try {
			const doc = query.doc(`${id}`);
			const item = await doc.delete();
		} catch (e) {
			console.log(e);
		}
	}
	async updateById(id, newitem) {
		try {
			const query = db.collection(`${this.name}`);
			const item = await query.where("id", "==", `${id}`).get();
			const itemData = await item.data();
			itemData.update(newitem);
			const response = item.data();
			console.log(response);
		} catch (e) {
			console.log(`Error: ${e.message}`);
			s;
		}
	}
}
export { ContenedorFirebase };
