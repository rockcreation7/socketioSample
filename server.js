var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/2', function (req, res) {
  res.sendFile(__dirname + '/indexrm2.html');
});

io.on('connection', function (socket) {
   

  socket.on('say to someone', function(id, msg){
    console.log(msg);
    socket.broadcast.to(id).emit('my message', msg);
  });

  socket.emit('news', {
    hello: 'world'
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });


  socket.on('my other event1', function (data) {
    console.log(data);
  });

  socket.on('join room 1', function (data) {
    socket.join('some room');
    io.to('some room').emit('some event');

  });

  setTimeout(
    () => {
      io.to('some room').emit('some event');
    }
    , 3000
  )


});