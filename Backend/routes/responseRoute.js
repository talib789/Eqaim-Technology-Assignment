const express = require("express");
const router = express.Router();
const { addition } = require("../controllers/responseController");

router.route("/addition").post(addition);

module.exports = router;
