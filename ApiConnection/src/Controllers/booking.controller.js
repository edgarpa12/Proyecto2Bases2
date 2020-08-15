const sendkafka = require('./producer.controller')


class bookingController {
    book = (req, res) => {
        const { fechaHoy, fechaDeseada, origen, destino } = req.body;
    
        console.log(fechaHoy, fechaDeseada, origen, destino);
        const topic = 'bookings'
        sendkafka(fechaHoy, fechaDeseada, origen, destino, topic);
        res.send({ Book: fechaDeseada, destino });
    };
}
module.exports = bookingController;