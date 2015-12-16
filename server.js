var express = require('express');
var app = express();
var server = require('http').Server(app);
var mongoose = require('mongoose');
var fs = require('fs');

// ensure uploads directory is created

if (!fs.existsSync('./uploads')) {
  fs.mkdir('./uploads');
}

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.use(express.bodyParser({uploadDir: './uploads'}));

app.use(express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/uploads'));

app.set('proot', __dirname);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, mongoose, db);

var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.join('chatroom');

    socket.on('message', function (data) {
        console.log('chat', data);
        socket.broadcast.emit('message', data);
    });
})

server.listen(port, ipaddress);

