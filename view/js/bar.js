var barObj = function()
{
    this.id = 'bar';
    this.direction = 0;
    this.size = {'width':100,'height':10};
    this.speed = 25;
    this.isRepeating = false;
    
    
    var _positionX = ((engine.resolution.x/2)-(this.size.width/2));
    var _positionY = (engine.resolution.y-100);
    this.position = {}; 
    
    this.bindBox = 
    {
        'topLeft':{'x':_positionX,'y':_positionY},
        'topRight':{'x':(_positionX+this.size.width),'y':_positionY},
        'bottomRight':{'x':(_positionX+this.size.width),'y':(_positionY+this.size.height)},
        'bottomLeft':{'x':_positionX,'y':(_positionY+this.size.height)}
    }
    
    var obj = this;
    
    var positionXSet = function(val)
    {
        obj.bindBox.topLeft.x = val;
        obj.bindBox.topRight.x = (val+obj.size.width);
        obj.bindBox.bottomRight.x = (val+obj.size.width);
        obj.bindBox.bottomLeft.x = val;
        _positionX = val;
    },
    positionYSet = function(val)
    {
        obj.bindBox.topLeft.y = val;
        obj.bindBox.topRight.y = val;
        obj.bindBox.bottomRight.y = (val+obj.size.height);
        obj.bindBox.bottomLeft.y = (val+obj.size.height);
        _positionY = val;
    }
    
    Object.defineProperty(this.position,'x',{
        enumerable: true,
        configurable: false,
        get:function(){return _positionX},
        set: positionXSet    
    });
    Object.defineProperty(this.position,'y',{
        enumerable: true,
        configurable: false,
        get:function(){return _positionY},
        set: positionYSet    
    });
    
    this.nextPosition = function(pos)
    {
        switch(obj.direction)
        {
            case 0:
                return {'topLeft':{'x':(pos.x+obj.speed)},'topRight':{'x':(pos.x+obj.speed+obj.size.width)}};
            case 1:
                return {'topLeft':{'x':(pos.x-obj.speed)},'topRight':{'x':(pos.x-obj.speed+obj.size.width)}};
        }
    }
    
    this.moveRight = function(e)
    {
        obj.direction = 0;
        var nextPos = obj.nextPosition(obj.position);
        var collision = physics.checkBarCollision(nextPos);
        if(collision.hit)
        {
            obj.position.x = (engine.resolution.x-obj.size.width);
            return;  
        }
        else
        {
            obj.position.x += obj.speed;   
        }
        
    }
    
    this.moveLeft = function(e)
    {
        e.repeat = true;
        obj.direction = 1;
        var nextPos = obj.nextPosition(obj.position);
        var collision = physics.checkBarCollision(nextPos);
        if(collision.hit)
        {
            obj.position.x = 0;
            return;   
        }
        else
        {
            obj.position.x -= obj.speed;
        }
    }
    
    input.addKeyBinding('right',this.moveRight);
    input.addKeyBinding('left',this.moveLeft);
    
    input.addKeyBinding('d',this.moveRight);
    input.addKeyBinding('a',this.moveLeft);

    this.draw = function(swapChain)
    {
        /* draw to canvas */
        swapChain.fillstyle = this.color;
        swapChain.beginPath();
        swapChain.rect(this.position.x,this.position.y,this.size.width,this.size.height);
        swapChain.closePath();
        swapChain.fill();
    }
}
