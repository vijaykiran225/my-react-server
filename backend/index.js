let express = require('express');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');

const kafka = require('kafka-node');

const Producer = kafka.Producer
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new Producer(client, { requireAcks: 0, partitionerType: 2 });


let app = express();
// parse application/json
app.use(bodyParser.json());


let serv = app.listen(3500);



const conn = mongoose.connect("mongodb://root:example@mongo:27017/movieDB?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => {
        console.error('Could not connect to MongoDB:‌');
        serv.close();

        process.exit(1);
    });

producer.on('ready', function () {
    console.log('Connected to kafka ...')
});

producer.on('error', function (error) {
    console.error(error);
    console.error('Could not connect to kafka:‌');
    serv.close();

    process.exit(1);
});

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

var movieSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    year: String,
    body: String
});

app.get('/health', function (req, res) {
    res.send('app is up')
});

app.post('/movies', function (req, res) {

    const MyModel = mongoose.model('Movie', movieSchema, 'movie');
    const m = new MyModel();
    console.log(req);

    m.title = req.body.title;
    m.year = req.body.year;
    m.body = req.body.body;

    m.save()
        .then(x => res.json(x))
        .catch(x => {
            console.log(x);
            res.send('failed');
        });

});

app.get('/movies', function (req, res) {

    const MyModel = mongoose.model('Movie', movieSchema, 'movie');

    MyModel.find((err, docs) => {
        if (err) {
            console.log(err);

            res.json({ error: "failed" });
        } else {
            res.json(docs);
        }

    })

});

app.get('/movies/:movieId', function (req, res) {

    const MyModel = mongoose.model('Movie', movieSchema, 'movie');

    MyModel.findById(req.params.movieId, (err, doc) => {
        if (err) {
            console.log(err);
            res.json({ error: "failed" });
        } else {
            res.json(doc);
        }
    });

});


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


