import pkg from "mongoose";
import { productSchema } from "./products.js";
const { Schema, model } = pkg;
const cartSchema = new Schema(
	{
		timestamp: { type: Date, required: true, default: Date.now },
		productos: [productSchema],
		id: { type: Number, required: true },
	},
	{
		versionKey: false,
	}
);
const cartModel = model("Cart", cartSchema);

export { cartModel };
