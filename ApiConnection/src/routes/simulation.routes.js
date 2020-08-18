const express = require("express");
const router = express.Router();
const simulationController = require("../Controllers/simulation.controller");


const _simulationController = new simulationController();

router.get("/", _simulationController.simulationBookings);

module.exports = router;