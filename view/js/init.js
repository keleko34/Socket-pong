/* MAIN INIT FOR WHEN DOM CONTENT IS LOADED */
var init = function(ev){

    var view = document.getElementById('view');

    var run = function(mode,pdata)
    {
        if(mode == 1)
        {
            engine = new engineObj(view);
            input = new inputObj();
            ball = new ballObj();
            bar = new barObj();

            engine.addToRenderChain(bar);
            engine.addToRenderChain(ball);
            
            pip = new pipObj();

            physics = new physicsObj();
            main = new mainObj(engine);

            /* test */
            main.start();
        }
        else if(mode == 2)
        {
            engine = new engineObj(view);
            input = new inputObj();
            ball = new ballObj();
            ball.position.y = (pdata[1].ball.y*-1);
            ball.position.x = pdata[1].ball.x;
            ball.angle = ball.setReverseNAngle(pdata[1].ball.angle);
            ball.hasControl = !pdata[1].hasControl;
            bar = new barObj();

            engine.addToRenderChain(bar);
            engine.addToRenderChain(ball);

            pip = new pipObj();
            
            physics = new physicsObj();
            main = new mainObj(engine);

            /* test */
            main.start();
        }
    }
    
    network = new networkObj(run);
    menu = new menuObj(network);
    
    menu.activatePlayerNameMenu();

document.removeEventListener('DOMContentLoaded', init, false);
}
document.addEventListener('DOMContentLoaded', init, false);
