// import required essentials
const http = require('http');
const express = require('express');
var cors = require('cors');
// import `items` from `routes` folder 
const itemsRouter = require('./task');

// create new app
const app = express();
app.use(express.json());

app.use(cors({origin: 'http://localhost:8100'}));


app.use('/items', itemsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('Api works');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);