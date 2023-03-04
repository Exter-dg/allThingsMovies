const create = (req, res) => {
	console.log("Body: ", req.body);
	res.json({user: req.body});
};

module.exports = {
	create
}