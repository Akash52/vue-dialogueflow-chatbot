const express = require("express");
const router = express.Router();

const dialogflowController = require("./controllers/dialogflow.controller");

router.post("/query", dialogflowController.query);

module.exports = router;
