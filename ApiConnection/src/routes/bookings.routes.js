const express = require("express");
const router = express.Router();
const { json } = require("express");
const bookingController = require("../Controllers/booking.controller");


const bookController = new bookingController();

//Busqueda
router.post("/search", bookController.search);
//ComprabookController
router.post("/book", bookController.book);

module.exports = router;
