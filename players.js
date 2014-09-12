var base = function() //{'player':name,'count':0,'id':0,'conection':connectionObj,'isWaiting':true,'vs':name}
{
    this.players = {};
    this.conns = {};
    this.length = 0;
    var obj = this;
    this.getLength = function()
    {
        var count = 0;
        for(var player in this.players)
        {
            count += 1;
        }
        if(playerbase.length != count)
        {
            playerbase.length = count;   
        }
        return count;
    }
}

var playerbase = new base();

console.log(playerbase);

var player = function(name,connection,base)
{
    this.name = name;
    this.id = connection.id;
    this.placement = base.getLength();
    this.connection = connection;
    this.isWaiting = true;
    this.opponent = {};
    
    this.connect = function(oponent)
    {
        this.opponent = oponent;
    }
    this.disconnect = function()
    {
        base.players[this.name] = '';
        delete base.players[this.name];
    }
    base.players[name] = this;
    base.conns[connection.id] = name;
}

exports.player = player;
exports.playerbase = playerbase;