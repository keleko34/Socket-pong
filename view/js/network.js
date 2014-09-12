var networkObj = function(run)
{
    this.mode = 1;
    
    this.socket = {};
    
    this.attachListeners = function(socket,menu)
    {
        socket.on('opponentList',function(data)
        {
            console.log('incoming List',data);
            if(data == null)
            {
                menu.activateOpponentsMenu({'message':'No one is currently in queue :( Waiting for new opponent...'});
            }
            else
            {
                menu.activateOpponentsMenu(data);
            }
        });
        
        socket.on('playerNew',function(pdata)
        {
            console.log('incoming data new connect',pdata);
            menu.filterOpponentList(pdata,'add');
        });
        
        socket.on('playerLeft',function(pdata)
        {
            console.log('incoming data disconnect',pdata);
            menu.filterOpponentList(pdata,'remove');
        });
        
        socket.on('request',function(pdata)
        {
            console.log('request',pdata);
            menu.recieveRequest(pdata);
        });
        
        socket.on('decline',function(pdata)
        {
            console.log('declined!',pdata);
            menu.responseTerm({'type':'decline','user':pdata});
        });
        
        socket.on('accept',function(pdata)
        {
            console.log('accepted!',pdata);
            menu.responseTerm({'type':'accept','user':pdata});
        });
        
        socket.on('updateUsers',function(pdata)
        {
            menu.updateOppList(pdata);
        });
        
    }
    
    
    /*
    this.socket = io('http://192.168.22.5',{query:{'user':'joey'}});
    
    var obj = this;
    
    this.socket.on('connected', function (data) 
    {
        if(data.players == 2)
        {
            obj.mode = 2;                         
        }
        else if(data.players == 1)
        {
            obj.mode = 1;
        }
        else
        {
            obj.mode = 0;   
        }
        run(obj.mode,data.pdata);
    });
    
    this.socket.on('message',function(data)
    {
        if(data.player == 1 && obj.mode == 2)
        {
            ball.setFromNetwork(data);
            pip.drawPIP(data);
        }
        else if(data.player == 2 && obj.mode == 1)
        {
            ball.setFromNetwork(data);
            pip.drawPIP(data);
        }
    });
    
    this.sendData = function(data)
    {
        this.socket.emit('position',data);
    }
    */
    
    
}