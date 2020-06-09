const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });


const Consumer = kafka.Consumer;
const consumer = new Consumer(client,
    [{ topic: "Cricket", partition: 0 }],
    {
        autoCommit: false
    }
);


consumer.on("message", function (message) {
    console.log('receiving message' + JSON.stringify(message));

});

consumer.on('error', function (err) {
    console.log('Error:', err);
});