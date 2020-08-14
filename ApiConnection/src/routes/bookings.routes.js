const express = require("express");
const router = express.Router();
const { json } = require("express");
const bookingController = require("../Controllers/booking.controller");



const controller  = new bookingController();
//Busqueda
router.post("/", controller.search);

module.exports = router;
