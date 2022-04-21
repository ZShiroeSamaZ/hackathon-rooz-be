const express = require("express");
const router = express.Router();

// ใส่ path ตรงนี้
router.use("/test", require("./test"));
router.use("/books", require("./books"));
router.use("/users", require("./users"));
router.use("/diary", require("./diary"));
// ------------

module.exports = router;