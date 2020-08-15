const { Kafka } = require('kafkajs')
const kafka = require('kafka-node');
const config = require('../config/config');


try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient({kafkaHost: config.kafka_serverC});
    const producer = new Producer(client);

    function sendkafka(fechaHoy, fechaDeseada, origen, destino, topic) {
        let payloads = [
            {
              topic: topic,
              messages: fechaHoy + "," + fechaDeseada + "," + origen + "," + destino
            }
          ];
        let push_status = producer.send(payloads, (err, data) => {
            if (err) {
              console.log('[kafka-producer -> '+topic+' ]: broker update failed');
            } else {
              console.log('[kafka-producer -> '+topic+' ]: broker update success');
            }
        });
    }
}
catch(e) {
    console.log(e);
}
module.exports = sendkafka;
    