const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("It's Work! at Test");
})

module.exports = router;