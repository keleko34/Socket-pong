var physicsObj = function()
{
    var ballBounceAngles =
    {
        '0':{'validX':[5,6,7,8,9,10,11],'validY':[]},
        '1':{'validX':[6,7],'validY':[14,15]},
        '2':{'validX':[5,6,7],'validY':[13,14,15]},
        '3':{'validX':[5,6],'validY':[13,14]},
        '4':{'validX':[12],'validY':[10,11,12,13,14]},
        '5':{'validX':[2,3],'validY':[11,10]},
        '6':{'validX':[1,2,3],'validY':[9,10,11]},
        '7':{'validX':[1,2],'validY':[9,10]},
        '8':{'validX':[0,1,2,3,13,14,15],'validY':[]},
        '9':{'validX':[14,15],'validY':[6,7]},
        '10':{'validX':[13,14,15],'validY':[5,6,7]},
        '11':{'validX':[13,14],'validY':[5,6]},
        '12':{'validX':[4],'validY':[1,2,3,4,5,6,7]},
        '13':{'validX':[10,11],'validY':[2,3]},
        '14':{'validX':[9,10,11],'validY':[1,2,3]},
        '15':{'validX':[9,10],'validY':[1,2]}
    }
    
    this.checkBallCollision = function(bindBox,angle)
    {
        var getAngle = function(a,t)
        {
            var possibleAngles = ballBounceAngles[a.toString()]['valid'+t];
            var random = parseInt(Math.random()*(possibleAngles.length-1));
            a = possibleAngles[random];
            return a;
        }
        
        switch(true)
        {
            case bindBox.topLeft.x <= 0:
                //hit left wall
                var isGoodAngle = false;
                var goodAngles = [5,6,7,8,9,10,11];
                for(var x=0;x<goodAngles.length;x++)
                {
                    if(angle == goodAngles[x])
                    {
                        isGoodAngle = true;   
                    }
                }
                var newAngle = angle;
                if(isGoodAngle)
                {
                    newAngle = getAngle(angle,'X');
                }
                return {'angle':newAngle,'hit':true,'type':'wall'};
            case bindBox.topRight.x >= engine.resolution.x:
                //hit right wall
                var isGoodAngle = false;
                var goodAngles = [0,1,2,3,13,14,15];
                for(var x=0;x<goodAngles.length;x++)
                {
                    if(angle == goodAngles[x])
                    {
                        isGoodAngle = true;   
                    }
                }
                var newAngle = angle;
                if(isGoodAngle)
                {
                    newAngle = getAngle(angle,'X');
                }
                return {'angle':newAngle,'hit':true,'type':'wall'};
            case bindBox.bottomLeft.y >= engine.resolution.y:
                //hit bottom wall
                var isGoodAngle = false;
                var goodAngles = [9,10,11,12,13,14,15];
                for(var x=0;x<goodAngles.length;x++)
                {
                    if(angle == goodAngles[x])
                    {
                        isGoodAngle = true;   
                    }
                }
                var newAngle = angle;
                if(isGoodAngle)
                {
                    newAngle = getAngle(angle,'Y');
                }
                return {'angle':newAngle,'hit':true,'type':'wall'};
            case bindBox.bottomRight.y >= bar.bindBox.topLeft.y && bindBox.bottomRight.y < bar.bindBox.bottomLeft.y && bindBox.bottomRight.x > bar.bindBox.topLeft.x && bindBox.bottomRight.x < bar.bindBox.topRight.x:
                //hit somewhere on the top of the bar
                var isGoodAngle = false;
                var goodAngles = [9,10,11,12,13,14,15];
                for(var x=0;x<goodAngles.length;x++)
                {
                    if(angle == goodAngles[x])
                    {
                        isGoodAngle = true;   
                    }
                }
                var newAngle = angle;
                if(isGoodAngle)
                {
                    newAngle = getAngle(angle,'Y');
                }
                return {'angle':newAngle,'hit':true,'type':'bar'};   
            case bindBox.bottomLeft.y >= bar.bindBox.topLeft.y && bindBox.bottomLeft.y < bar.bindBox.bottomLeft.y && bindBox.bottomLeft.x > bar.bindBox.topLeft.x && bindBox.bottomLeft.x < bar.bindBox.topRight.x:
                //hit somewhere on the top of the bar
                var isGoodAngle = false;
                var goodAngles = [9,10,11,12,13,14,15];
                for(var x=0;x<goodAngles.length;x++)
                {
                    if(angle == goodAngles[x])
                    {
                        isGoodAngle = true;   
                    }
                }
                var newAngle = angle;
                if(isGoodAngle)
                {
                    newAngle = getAngle(angle,'Y');
                }
                return {'angle':newAngle,'hit':true,'type':'bar'};
                /*
            case bindBox.topRight.x >= bar.bindBox.topLeft.x && bindBox.topRight.y > bar.bindBox.topLeft.y && bindBox.topRight.y < bar.bindBox.bottomLeft.y:
                //hit somewhere on the left of the bar
                var newAngle = getAngle(angle,'X');
                return {'angle':newAngle,'hit':true,'type':'bar'};
            case bindBox.bottomRight.x >= bar.bindBox.topLeft.x && bindBox.bottomRight.y > bar.bindBox.topLeft.y && bindBox.bottomRight.y < bar.bindBox.bottomLeft.y:
                //hit somewhere on the left of the bar
                var newAngle = getAngle(angle,'X');
                return {'angle':newAngle,'hit':true,'type':'bar'};     
            case bindBox.topLeft.x <= bar.bindBox.topRight.x && bindBox.topLeft.y > bar.bindBox.topRight.y && bindBox.topLeft.y < bar.bindBox.bottomRight.y:
                //hit somewhere on the right of the bar
                var newAngle = getAngle(angle,'X');
                return {'angle':newAngle,'hit':true,'type':'bar'};
            case bindBox.bottomLeft.x <= bar.bindBox.topRight.x && bindBox.bottomLeft.y > bar.bindBox.topRight.y && bindBox.bottomLeft.y < bar.bindBox.bottomRight.y:
                //hit somewhere on the right of the bar
                var newAngle = getAngle(angle,'X');
                return {'angle':newAngle,'hit':true,'type':'bar'};
                */
            default:
                //no collision detected
                return {'angle':angle,'hit':false,'type':'none'};
                
        }
    }
    
    this.checkBarCollision = function(bindBox)
    {
        switch(true)
        {
            case bindBox.topRight.x >= engine.resolution.x:
                return {'hit':true,'type':'wall'};
            case bindBox.topLeft.x <= 0:
                return {'hit':true,'type':'wall'};
            default:
                return {'hit':false,'type':'none'};
        }
    }
}
