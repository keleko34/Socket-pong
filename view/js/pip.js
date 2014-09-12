var pipObj = function()
{
    var sizeRatio = 4;
    
    var pipChain = document.createElement('canvas');
    pipChain.width = parseInt(1024/sizeRatio).toString();
    pipChain.height = parseInt(768/sizeRatio).toString();
    var pipChainCTX = pipChain.getContext('2d');
    
    
    var pip = document.getElementById('pip');
    var pipCTX = pip.getContext('2d');
    
    this.drawPIP = function(data)
    {
        pipChain.width = pipChain.width;
        
        /* background 
        pipChainCTX.fillstyle = '#ffffff';
        pipChainCTX.beginPath();
        pipChainCTX.rect(0,0,pipChain.width,pipChain.height);
        pipChainCTX.closePath();
        pipChainCTX.fill();
        */
        
        /* ball */
        pipChainCTX.fillstyle = ball.color;
        pipChainCTX.beginPath();
        pipChainCTX.arc((data.ball.x/sizeRatio),(data.ball.y/sizeRatio),(ball.size/sizeRatio),0,Math.PI*2);
        pipChainCTX.closePath();
        pipChainCTX.fill();

        /* bar */
        pipChainCTX.fillstyle = bar.color;
        pipChainCTX.beginPath();
        pipChainCTX.rect((data.bar.x/sizeRatio),(data.bar.y/sizeRatio),(bar.size.width/sizeRatio),(bar.size.height/sizeRatio));
        pipChainCTX.closePath();
        pipChainCTX.fill();
        
        pip.width = pip.width;
        pipCTX.drawImage(pipChain,0,0,pip.width,pip.height);
        
    }
    
}