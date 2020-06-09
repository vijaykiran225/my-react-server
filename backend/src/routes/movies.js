let express = require('express');
let mongoose = require('mongoose');

let app = express.Router();

mongoose.connect("mongodb://root:example@mongo:27017/movieDB?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => {
        console.error('Could not connect to MongoDB:‌');
        // serv.close();
    });



var movieSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    year: String,
    body: String
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


module.exports = app;