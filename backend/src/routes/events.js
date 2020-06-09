let exp = require('express');

let app = exp.Router();

const kafka = require('kafka-node');

const Producer = kafka.Producer
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });



app.get('/events', function (req, res) {



    // Create a new payload
    const payload = [{
        topic: "Cricket",
        messages: {
            "userId": "MS Dhoni"
        }
        // partition: 0

    }];
    //Send payload to Kafka and log result/error
    producer.send(payload, function (error, result) {
        console.info('Sent payload to Kafka: ', payload);
        if (error) {
            console.error(error);
            res.send(error);
        } else {
            console.log('result: ', result)
            res.json(payload);
        }
    });

});

producer.on('ready', function () {
    console.log('Connected to kafka ...')
});

producer.on('error', function (error) {
    console.error(error);
    console.error('Could not connect to kafka:‌');
    // serv.close();

    // process.exit(1);
});

module.exports = app;