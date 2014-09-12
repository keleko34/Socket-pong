var inputObj = function()
{
    this.keyDict =
    {
        '`':'192',
        '1':'49',
        '2':'50',
        '3':'51',
        '4':'52',
        '5':'53',
        '6':'54',
        '7':'55',
        '8':'56',
        '9':'57',
        '0':'48',
        '-':'189',
        '=':'187',
        'backspace':'8',
        'tab':'9',
        'q':'81',
        'w':'87',
        'e':'69',
        'r':'82',
        't':'84',
        'y':'89',
        'u':'85',
        'i':'73',
        'o':'79',
        'p':'80',
        '[':'219',
        ']':'221',
        '\\':'220',
        'caps':'20',
        'a':'65',
        's':'83',
        'd':'68',
        'f':'70',
        'g':'71',
        'h':'72',
        'j':'74',
        'k':'75',
        'l':'76',
        ';':'186',
        "'":'222',
        'enter':'13',
        'shift':'16',
        'z':'90',
        'x':'88',
        'c':'67',
        'v':'86',
        'b':'66',
        'n':'78',
        'm':'77',
        ',':'188',
        '.':'190',
        '/':'191',
        'ctrl':'17',
        'alt':'18',
        'space':'32',
        'up':'38',
        'right':'39',
        'down':'40',
        'left':'37'
        
    }
    
    this.keyBindings = 
    {
        '192':{'name':'`','set':false,'func':null},
        '49':{'name':'1','set':false,'func':null},
        '50':{'name':'2','set':false,'func':null},
        '51':{'name':'3','set':false,'func':null},
        '52':{'name':'4','set':false,'func':null},
        '53':{'name':'5','set':false,'func':null},
        '54':{'name':'6','set':false,'func':null},
        '55':{'name':'7','set':false,'func':null},
        '56':{'name':'8','set':false,'func':null},
        '57':{'name':'9','set':false,'func':null},
        '48':{'name':'0','set':false,'func':null},
        '189':{'name':'-','set':false,'func':null},
        '187':{'name':'=','set':false,'func':null},
        '8':{'name':'backspace','set':false,'func':null},
        '9':{'name':'tab','set':false,'func':null},
        '81':{'name':'q','set':false,'func':null},
        '87':{'name':'w','set':false,'func':null},
        '69':{'name':'e','set':false,'func':null},
        '82':{'name':'r','set':false,'func':null},
        '84':{'name':'t','set':false,'func':null},
        '89':{'name':'y','set':false,'func':null},
        '85':{'name':'u','set':false,'func':null},
        '73':{'name':'i','set':false,'func':null},
        '79':{'name':'o','set':false,'func':null},
        '80':{'name':'p','set':false,'func':null},
        '219':{'name':'[','set':false,'func':null},
        '221':{'name':']','set':false,'func':null},
        '220':{'name':'\\','set':false,'func':null},
        '20':{'name':'caps','set':false,'func':null},
        '65':{'name':'a','set':false,'func':null},
        '83':{'name':'s','set':false,'func':null},
        '68':{'name':'d','set':false,'func':null},
        '70':{'name':'f','set':false,'func':null},
        '71':{'name':'g','set':false,'func':null},
        '72':{'name':'h','set':false,'func':null},
        '74':{'name':'j','set':false,'func':null},
        '75':{'name':'k','set':false,'func':null},
        '76':{'name':'l','set':false,'func':null},
        '186':{'name':';','set':false,'func':null},
        '222':{'name':"'",'set':false,'func':null},
        '13':{'name':'enter','set':false,'func':null},
        '16':{'name':'shift','set':false,'func':null},
        '90':{'name':'z','set':false,'func':null},
        '88':{'name':'x','set':false,'func':null},
        '67':{'name':'c','set':false,'func':null},
        '86':{'name':'v','set':false,'func':null},
        '66':{'name':'b','set':false,'func':null},
        '78':{'name':'n','set':false,'func':null},
        '77':{'name':'m','set':false,'func':null},
        '188':{'name':',','set':false,'func':null},
        '190':{'name':'.','set':false,'func':null},
        '191':{'name':'/','set':false,'func':null},
        '17':{'name':'ctrl','set':false,'func':null},
        '18':{'name':'alt','set':false,'func':null},
        '32':{'name':'space','set':false,'func':null},
        '38':{'name':'up','set':false,'func':null},
        '39':{'name':'right','set':false,'func':null},
        '40':{'name':'down','set':false,'func':null},
        '37':{'name':'left','set':false,'func':null}
        
    }
    
    this.addKeyBinding = function(key,callback)
    {
        
        if(this.keyDict[key.toLowerCase()] != 'undefined')
        {
            this.keyBindings[this.keyDict[key.toLowerCase()]].set = true;
            this.keyBindings[this.keyDict[key.toLowerCase()]].func = callback;
        }
    }
    
    var obj = this;
    /* attach events */
    
    var keydown = function(e)
    {
        if(typeof obj.keyBindings[e.keyCode.toString()] != 'undefined')
        {
            if(obj.keyBindings[e.keyCode.toString()].set)
            {
                e.preventDefault();
                obj.keyBindings[e.keyCode.toString()].func(this,e);
                return false;
            }
        }
    }
    
    var keyup = function(e)
    {
        
    }
    
    document.addEventListener('keydown',keydown);
    document.addEventListener('keyup',keyup);
    
}