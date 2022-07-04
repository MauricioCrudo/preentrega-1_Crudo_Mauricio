import mongoose from "mongoose";
const URL = "mongodb://127.0.0.1:27017/ecommerce";

const dbconnection = mongoose.connect(URL, {
	useNewUrlParser: true,
});
export { dbconnection };
