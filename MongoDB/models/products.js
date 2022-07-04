import pkg from "mongoose";
const { Schema, model } = pkg;
const productSchema = new Schema(
	{
		id: Number,
		title: { type: String, required: true, max: 200 },
		price: { type: Number, required: true },
		desc: { type: String, required: true },
		stock: { type: Number, required: true },
		thumbnail: { type: String, required: true },
	},
	{
		versionKey: false,
	}
);
const productModel = model("Products", productSchema);
export { productModel, productSchema };
