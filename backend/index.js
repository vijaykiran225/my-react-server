let express = require('express');
let sports = require('./src/routes/sports.js');
let events = require('./src/routes/events.js');
let movies = require('./src/routes/movies.js');


let app = express();
// parse application/json

app.use(express.json());
app.use(sports);
app.use(events);
app.use(movies);


app.get('/health', function (req, res) {
    res.send('app is up')
});

app.listen(3500);