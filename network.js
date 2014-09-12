var players = require('./players');
var playerbase = players.playerbase;

var connection = function(io)
{
    console.log('adding connections');
    
    io.set('authorization', function (handshake, cb)
    {
        cb(null, true);
    });
    
    io.on('connection', function(conn)
    {
        console.log('user: '+conn.handshake.query.user+' connected');
        var player = new players.player(conn.handshake.query.user,conn,playerbase);
        
        var name = playerbase.players[playerbase.conns[conn.id]].name;
        var id = playerbase.players[playerbase.conns[conn.id]].id;
        
        var sendcon = {};
        sendcon[player.name] = player.id;
        
        conn.broadcast.emit('playerNew',sendcon);
        
        var oponnentList = {};
        
        if(playerbase.length > 0)
        {  
            for(var person in playerbase.players)
            {
                if(playerbase.players[person].isWaiting && person != player.name)
                {
                    oponnentList[person] = playerbase.players[person].id;
                }
            }   
        }
        else
        {
            oponnentList = null;
        }
        conn.emit('opponentList', oponnentList);
        
        conn.on('disconnect', function()
        {
            console.log('user: '+playerbase.conns[conn.id]+' disconnected');
            
            var senddisc = {};
            senddisc[player.name] = player.id;
            
            conn.broadcast.emit('playerLeft',senddisc);
            playerbase.players[playerbase.conns[conn.id]].disconnect();

        });
        
        conn.on('opponent',function(data)
        {
            playerbase.players[playerbase.conns[data.id]].connection.emit('request',{'name':player.name,'id':player.id});
        });
        
        conn.on('decline',function(data)
        {
            playerbase.players[playerbase.conns[data.id]].connection.emit('decline',{'name':player.name,'id':player.id});
        });
        
        conn.on('accept',function(data)
        {
            playerbase.players[playerbase.conns[data.id]].connection.emit('accept',{'name':player.name,'id':player.id});
            
            playerbase.players[playerbase.conns[data.id]].opponent = {'name':player.name,'id':player.id};
            playerbase.players[playerbase.conns[data.id]].isWaiting = false;
            player.opponent = {'name':data.name,'id':data.id};
            player.isWaiting = false;
            
            if(playerbase.length > 0)
            {  
                for(var person in playerbase.players)
                {
                    if(playerbase.players[person].isWaiting && person != player.name)
                    {
                        oponnentList[person] = playerbase.players[person].id;
                    }
                }   
            }
            else
            {
                oponnentList = null;
            }
            
            
            io.sockets.emit('updateUsers', oponnentList);
        });
        
        conn.on('position',function(data)
        {

        });
        
        conn.on('play',function(data)
        {
            
        });
        
        
    });
}

exports.connection = connection;