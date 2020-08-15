const express = require("express");
const router = express.Router();
const { json } = require("express");
const searchingController = require("../Controllers/searching.controller");
const bookingController = require("../Controllers/booking.controller");



const searchController  = new searchingController();
const bookController = new bookingController();

//Busqueda
router.post("/search", searchController.search);
//Compra
router.post("/book", bookController.book);

module.exports = router;
