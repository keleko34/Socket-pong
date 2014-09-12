var engineObj = function(view)
{
    /* engine properties */
    this.debug = true;
    this.swapChain = {};
    this.swapChainCTX = {};
    this.viewPort = {};
    this.viewPortCTX = {};
    this.renderChain = [];
    this.isRunning = false;
    this.resolution = {'x':1024,'y':768};

    /* create swapchain */
    this.swapChain = document.createElement('canvas');
    this.swapChain.width = this.resolution.x.toString();
    this.swapChain.height = this.resolution.y.toString();
    this.swapChainCTX = this.swapChain.getContext('2d');

    /* setView */
    this.viewPort = view;
    this.viewPortCTX = view.getContext('2d');

    this.writeToSwapChain = function()
    {
        /* clear */
        this.swapChain.width = this.swapChain.width;

        for(var x=0;x<this.renderChain.length;x++)
        {
            if(typeof this.renderChain[x].draw != 'undefined')
            {
                this.renderChain[x].draw(this.swapChainCTX);
            }
        }
    }

    this.render = function()
    {
        this.viewPort.width = winWidth;
        this.viewPort.height = winHeight;
        this.viewPortCTX.drawImage(this.swapChain,0,0,this.viewPort.width,this.viewPort.height);
    }

    this.addToRenderChain = function(obj)
    {
        this.renderChain.push(obj);
    }


}
