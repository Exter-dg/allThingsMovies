const express = require("express");
const userRouter = require("./routes/user");
require("./db");

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);

app.get("/about", (req, res) => {
	res.send("About");
});

app.listen(8000, () => {
	console.log("The server is running on port 8000");
});