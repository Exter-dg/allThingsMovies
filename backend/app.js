const express = require("express");
require("express-async-errors");
require("dotenv").config();
require("./db");

const userRouter = require("./routes/user");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errors");



const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/about", (req, res) => {
	res.send("About");
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log("The server is running on port 8000");
});