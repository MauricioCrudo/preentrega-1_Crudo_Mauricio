import fs from "fs";
class ContainerMongo {
	constructor(name) {
		this.name = name;
	}
}
class ContainerFs {
	constructor(name) {
		this.name = name;
	}
	async save(item) {
		let cont;
		try {
			cont = await fs.promises.readFile(`./api/${this.name}.json`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}
		const last = cont[cont.length - 1];

		let id = 1;

		if (last) {
			id = last.id + 1;
		}
		!item.id ? (item.id = id) : item.id;

		cont.push(item);

		return fs.promises.writeFile(
			`./${this.name}.json`,
			JSON.stringify(cont, null, 2)
		);
	}

	async getById(id) {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.json`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}

		return cont.find((item) => item.id === id);
	}

	async getAll() {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.json`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}

		return cont;
	}

	async deleteById(id) {
		let cont;
		try {
			cont = await fs.promises.readFile(`./${this.name}.json`);
			cont = JSON.parse(cont);
		} catch (e) {
			cont = [];
		}

		let filteredcont = cont.filter((item) => item.id !== id);

		return fs.promises.writeFile(
			`./${this.name}.json`,
			JSON.stringify(filteredcont)
		);
	}

	async deleteAll() {
		return fs.promises.writeFile(`./${this.name}.json`, "");
	}
}

export { ContainerFs };
