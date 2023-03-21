const express = require("express");
const cors = require("cors");

require("express-async-errors");
require("dotenv").config();
require("./db");

const userRouter = require("./routes/user");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errors");
const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/about", (req, res) => {
	res.send("About");
});

app.use("/*", handleNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log("The server is running on port 8000");
});
