var ballObj = function()
{
    this.id = 'ball';
    this.speed = 4;
    this.angle = 12; // 16 possible angles
    this.size = 5;
    this.color = '#000000';
    this.hasControl = true;
    
    var _positionX = (engine.resolution.x/2);
    var _positionY = 30; 
    this.position = {};
    
    this.bindBox = 
    {
        'topLeft':{'x':_positionX,'y':_positionY},
        'topRight':{'x':(_positionX+this.size),'y':_positionY},
        'bottomRight':{'x':(_positionX+this.size),'y':(_positionY+this.size)},
        'bottomLeft':{'x':_positionX,'y':(_positionY+this.size)}
    }
    
    var obj = this;
    
    var positionXSet = function(val)
    {
        obj.bindBox.topLeft.x = val;
        obj.bindBox.topRight.x = val+obj.size;
        obj.bindBox.bottomRight.x = val+obj.size;
        obj.bindBox.bottomLeft.x = val;
        _positionX = val;
    },
    positionYSet = function(val)
    {
        obj.bindBox.topLeft.y = val;
        obj.bindBox.topRight.y = val;
        obj.bindBox.bottomRight.y = val+obj.size;
        obj.bindBox.bottomLeft.y = val+obj.size;
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
    
    this.setReverseNAngle = function(angle)
    {
        switch(angle)
        {
            case 0:
                return 0;
            case 1:
                return 15;
            case 2:
                return 14;
            case 3:
                return 13;
            case 4:
                return 12;
            case 5:
                return 11;
            case 6:
                return 10;
            case 7:
                return 9;
            case 8:
                return 8;
            case 9:
                return 7;
            case 10:
                return 6;
            case 11:
                return 5;
            case 12:
                return 4;
            case 13:
                return 3;
            case 14:
                return 2;
            case 15:
                return 1;
        }
    }
    
    this.setFromNetwork = function(data)
    {
        if(data.ball.hasControl)
        {
            this.position.x = data.ball.x;
            this.position.y = (data.ball.y*-1);
            this.angle = this.setReverseNAngle(data.ball.angle);
            this.hasControl = false;
        }
        else
        {
            if(!this.hasControl)
            {
                this.position.x = data.ball.x;
                this.position.y = (data.ball.y*-1);
                this.angle = this.setReverseNAngle(data.ball.angle);
                this.hasControl = true;
            }
        }   
    }
    
    this.animatePos = function()
    {
        switch(this.angle)
        {
            case 0:
                this.position.x += this.speed;
            break;
            case 1:
                this.position.x += this.speed;
                this.position.y -= (this.speed/2);
            break;
            case 2:
                this.position.x += this.speed;
                this.position.y -= this.speed;
            break;
            case 3:
                this.position.x += (this.speed/2);
                this.position.y -= this.speed;
            break;
            case 4:
                this.position.y -= this.speed;
            break;
            case 5:
                this.position.x -= (this.speed/2);
                this.position.y -= this.speed;
            break;
            case 6:
                this.position.x -= this.speed;
                this.position.y -= this.speed;
            break;
            case 7:
                this.position.x -= this.speed;
                this.position.y -= (this.speed/2);
            break;
            case 8:
                this.position.x -= this.speed;
            break;
            case 9:
                this.position.x -= this.speed;
                this.position.y += (this.speed/2);
            break;
            case 10:
                this.position.x -= this.speed;
                this.position.y += this.speed;
            break;
            case 11:
                this.position.x -= (this.speed/2);
                this.position.y += this.speed;
            break;
            case 12:
                this.position.y += this.speed;
            break;
            case 13:
                this.position.x += (this.speed/2);
                this.position.y += this.speed;
            break;
            case 14:
                this.position.x += this.speed;
                this.position.y += this.speed;
            break;
            case 15:
                this.position.x += this.speed;
                this.position.y += (this.speed/2);
            break;
        }
    }
    
    this.draw = function(swapChain)
    {
        if(obj.hasControl)
        {
            if((obj.position.x+obj.size) < 0 || obj.position.x > engine.resolution.x || obj.position.y > engine.resolution.y)
            {
                console.log('bindLeftX',obj.bindBox.topLeft.x); 
                console.log('bindLeftY',obj.bindBox.topLeft.y);
                console.log('bindRightX',obj.bindBox.topRight.x);
                console.log('bindRightY',obj.bindBox.topRight.x);
                console.log('angle',obj.angle);
            }
            obj.animatePos();
            var collision = physics.checkBallCollision(obj.bindBox,obj.angle);
            if(collision.hit)
            {
                obj.angle = collision.angle;
            }
            if(obj.bindBox.bottomLeft.y < 0)
            {
                obj.hasControl = false;
            }
        }

        /* draw to canvas */
        swapChain.fillstyle = this.color;
        swapChain.beginPath();
        swapChain.arc(this.position.x,this.position.y,this.size,0,Math.PI*2);
        swapChain.closePath();
        swapChain.fill();

    }
}
