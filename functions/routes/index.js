const express = require("express");
const router = express.Router();

// ใส่ path ตรงนี้
router.use("/test", require("./test"));
// ------------

module.exports = router;