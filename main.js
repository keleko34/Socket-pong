/* requires */
var sys = require("sys"),
http = require("http"),
path = require("path"),
url = require("url"),
fs = require("fs"),
views = require('./views');


var debug = true;

/* Server */
var app = http.createServer(function(req,res)
{
    var urlPath = url.parse(req.url).pathname;
    views.getView(urlPath,res);
});



/* Sockets */
var network = require('./network');
var socket = require("socket.io")(app);

var messages = new network.connection(socket);

/*
var players = 0;
var pData = [];
pData[1] = {};
pData[2] = {};

socket.on('connection', function(s){
    players += 1;
    s.on('disconnect',function()
    {
        players -= 1;
        console.log('player disconnected, players: '+players);
    });
    console.log('new connection, players: '+players);
    s.emit('connected', {'players':players,'connected':true,'pdata':pData});
    
    
    s.on('position',function(data)
    {
        if(debug)
        {
            //console.log('got position data from player '+data.player);
        }
        pData[data.player] = data;
        s.broadcast.emit('message',{'player':data.player,'bar':data.bar,'ball':data.ball});
    });
    
});
*/




app.listen(8080);

console.log('Server running');
