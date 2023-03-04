const mongoose = require('mongoose')

async function connectDB() {
	try {
		await mongoose.connect("mongodb://localhost:27017/review_app");
		console.log("Db is connected");
	} catch (err) {
		console.log("Db connection failed");
	}
}

connectDB();
