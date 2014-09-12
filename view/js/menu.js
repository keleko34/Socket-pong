var menuObj = function(net)
{
    var opponentList = document.getElementById('opponentList');
    var opponentsMenu = document.getElementById('opponents');
    var menu = document.getElementById('start');
    var input = document.getElementById('playername');
    var request = document.getElementById('sendReq');
    var reqMenu = document.getElementById('request');
    var requestTitle = document.getElementById('requestTitle');
    var join = document.getElementById('join');
    var decline = document.getElementById('decline');
    var messages = document.getElementById('messages');
    
    this.oppSelection = {};
    this.oppList = {};
    this.requestOpp = {};
    this.pendingReq = [];
    this.currentOpp = {};
    
    var obj = this;
    
    this.waitingpopup = function()
    {
           
    }
    
    this.responseTerm = function(res)
    {
        switch(res.type)
        {
            case 'accept':
                messages.innerHTML = res.user.name+' accepted your request, Starting Game!';
                obj.currentOpp = res.user;
                setTimeout(function(){
                    net.socket.emit('startGame',res.user);
                },2000);
            break;
            case 'decline':
                messages.innerHTML = res.user.name+' declined your request, what a wienie.';
                setTimeout(function(){
                    messages.style.display = 'none';
                    opponentsMenu.style.display = 'block';
                },2000);
            break;
        }
    }
    
    
    
    var sendDecline = function(e)
    {
        net.socket.emit('decline',obj.requestOpp);
            
        reqMenu.style.display = 'none';
        opponentsMenu.style.display = 'block';
        
        if(obj.pendingReq.length > 0)
        {
            obj.recieveRequest(obj.pendingReq);
            obj.pendingReq.splice(0,1);
        }
    },
    sendAcceptance = function(e)
    {
        obj.currentOpp = obj.requestOpp;
        net.socket.emit('accept',obj.requestOpp);
    }
    
    this.recieveRequest = function(user)
    {
        if(opponentsMenu.style.display != 'none')
        {
            obj.requestOpp = user;
            opponentsMenu.style.display = 'none';
            
            requestTitle.innerHTML = user.name+' has requested to play a game with you';
            
            reqMenu.style.display = 'block';
            
        }
        else
        {
            obj.pendingReq.push(user);   
        }
    }
    
    this.updateOppList = function(op)
    {
        opponentList.innerHTML = '';
        obj.oppList = op;
        for(var opp in obj.oppList)
        {
            var li = document.createElement('li');
            li.dataId = obj.oppList[opp];
            li.innerHTML = opp;
            opponentList.appendChild(li);
            li.addEventListener('click',selectOpponnent); 
            if(obj.oppSelection.name == opp)
            {
                activeSel = true;
                li.style.background = '#CCC';
                li.style.color = '#fff';
            }
        }
    }
    
    this.filterOpponentList = function(op,type)
    {
        
        opponentList.innerHTML = '';
        var activeSel = false;
        var n = '';
        var i = 0;
        for(var prop in op)
        {
            n = prop;
            i = op[prop];
        }
        if(type == 'add')
        {
            obj.oppList[n] = i;   
        }
        var selectOpponnent = function(e)
        {
            obj.oppSelection.name = this.innerHTML;
            obj.oppSelection.id = this.dataId;
            
            var list = opponentList.getElementsByTagName('li');
            for(var x=0;x<list.length;x++)
            {
                list[x].style.background = '#fff';
                list[x].style.color = '#000';
            }
            this.style.background = '#CCC';
            this.style.color = '#fff';
        }
        
        for(var opp in obj.oppList)
        {
            if(obj.oppList[opp] == i && type == 'remove')
            {
                delete obj.oppList[opp];
            }
            else
            {
                var li = document.createElement('li');
                li.dataId = obj.oppList[opp];
                li.innerHTML = opp;
                opponentList.appendChild(li);
                li.addEventListener('click',selectOpponnent); 
                if(obj.oppSelection.name == opp)
                {
                    activeSel = true;
                    li.style.background = '#CCC';
                    li.style.color = '#fff';
                }
            }
        }
        if(obj.oppList[opp] == null)
        {
            opponentList.innerHTML = '<li>No one is currently in queue :( Waiting for new opponent...</li>';
        }
        if(!activeSel)
        {
            obj.oppSelection = {};       
        }
    }
    
    this.activateOpponentsMenu = function(opps)
    {
        
        opponentsMenu.style.display = 'block';
        
        var selectOpponnent = function(e)
        {
            obj.oppSelection.name = this.innerHTML;
            obj.oppSelection.id = this.dataId;
            
            var list = opponentList.getElementsByTagName('li');
            for(var x=0;x<list.length;x++)
            {
                list[x].style.background = '#fff';
                list[x].style.color = '#000';
            }
            this.style.background = '#CCC';
            this.style.color = '#fff';
        }
        
        if(typeof opps.message != 'undefined')
        {
            opponentList.innerHTML = '<li>'+opps.message+'</li>';
        }
        else
        {
            for(var op in opps)
            {
                obj.oppList[op] = opps[op]
                var li = document.createElement('li');
                li.dataId = opps[op];
                li.innerHTML = op;
                opponentList.appendChild(li);
                li.addEventListener('click',selectOpponnent);
            }
        }
        
        var sendRequest = function()
        {
            if(obj.oppSelection.id != null)
            {
                net.socket.emit('opponent',obj.oppSelection);
                
                opponentsMenu.style.display = 'none';
                messages.innerHTML = 'Waiting for player response...';
                messages.style.display = 'block';
            }
        }

        request.addEventListener('click',sendRequest);
    }
    
    obj = this;
    
    this.activatePlayerNameMenu = function(e)
    {
        
        var sendNewPlayer = function(e)
        {
            if(input.value != '')
            {
                net.socket = io('http://192.168.22.5',{query:{'user':input.value}});
                net.attachListeners(net.socket,obj)
                menu.style.display = 'none';
            }
        }
        
        var cont = document.getElementById('cont');
        cont.addEventListener('click',sendNewPlayer);
    }
    
    
    
    join.addEventListener('click',sendAcceptance);
    decline.addEventListener('click',sendDecline);
    
}