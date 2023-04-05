const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
	if (!file.mimetype.startsWith("image")) cb("File type not supported!", false);
	cb(null, true);
};

const uploadImage = multer({ storage, fileFilter });

module.exports = uploadImage;
