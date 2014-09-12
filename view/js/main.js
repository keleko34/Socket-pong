function run()
{
    if(engine.isRunning)
    {
        requestAnimationFrame(run);
    }

    engine.render();
    engine.writeToSwapChain();
    var ballPos = ball.position;
    ballPos.angle = ball.angle;
    ballPos.hasControl = ball.hasControl;  
    //network.sendData({'player':network.mode,'bar':bar.position,'ball':ballPos});
    //console.log('running Game');
}

function mainObj(eng)
{
    /* Detect If Window Resizes */
    var resize = function(e)
    {
        winWidth = this.innerWidth;
        winHeight = this.innerHeight;
    }
    window.addEventListener('resize',resize);
    this.sockets = function()
    {

    }
    this.start = function()
    {
        eng.isRunning = true;
        requestAnimationFrame(run);
    }
    this.stop = function()
    {
        eng.isRunning = false;
    }
}
