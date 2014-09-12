
    var fs = require('fs'),
    path = require('path'),
    http = require('http'),
    https = require('https');

    var checkExtension = function(url)
    {
        var fileExtensions =
        {
            'html':'text/html',
            'css':'text/css',
            'js':'text/javascript',
            'json':'application/json',
            'png':'image/png',
            'jpg':'image/jpg',
            'wav':'audio/wav',
            'mp3':'audio/mp3'
        }

        var ext = path.extname(url);
        ext = ext.substring(1,ext.length);
        for(var i in fileExtensions)
        {
            if(ext === i)
            {
                return fileExtensions[i];
            }
        }

    }
    
    var getWebUrl = function(ht,u,p)
    {
        var options = 
        {
          host: u,
          port: 80,
          path: p
        }
        
        if(ht == 'http')
        { 
            http.get(options, function(res) 
            {
              console.log("Got response: " + res.statusCode);
            })
            .on('error', function(e) 
            {
              console.log("Got error: " + e.message);
            });
        }
        else
        {
            https.get(options, function(res) 
            {
              console.log("Got response: " + res.statusCode);
            })
            .on('error', function(e) 
            {
              console.log("Got error: " + e.message);
            });
        }
    }

    var getUrlHostEnd = function(url)
    {
        switch(true)
        {   
            case url.indexOf('.com') > -1:
                return '.com';
            case url.indexOf('.net') > -1:
                return '.net';
            case url.indexOf('.org') > -1:
                return '.org';
            case url.indexOf('.io') > -1:
                return '.io';
        }
    }
    
    var getView = function(url,res)
    {
        if(url == "/")
        {
            url = 'index.html';
        }
        url = path.join(__dirname+'/view/', url);

        var type = checkExtension(url);

        fs.exists(url, function(exists)
        {
           if(exists)
           {
              res.writeHead(200, { 'Content-Type': type });
              fs.createReadStream(url).pipe(res);
           }
           else
           {
                res.writeHeader(404, {"Content-Type": "text/plain"});
                res.write("404 Not Found\n");
                res.end();
           }
        });

    }
    exports.getView = getView;
