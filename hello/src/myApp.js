
/*
    https://github.com/nuisanceofcats/cc.extend
    cc.Node()
        cc.Node is the main element. Anything thats gets drawn or contains things that get drawn is a cc.Node.
        Subclasses of CCNode, such as CCLayer and CCSprite, give the scene its appearance and behavior
        The most popular cc.Nodes are: 
            cc.Scene, 
            cc.Layer, 
            cc.Sprite, 
            cc.Menu.

        The main features of a cc.Node are: 
        - They can contain other cc.Node nodes (addChild, getChildByTag, removeChild, etc) 
        - They can schedule periodic callback (schedule, unschedule, etc) 
        - They can execute actions (runAction, stopAction, etc) 

        Some cc.Node nodes provide extra functionality for them or their children.

        Subclassing a cc.Node usually means (one/all) of: 
        - overriding init to initialize resources and schedule callbacks 
        - create callbacks to handle the advancement of time 
        - overriding draw to render the node 

        Features of cc.Node: 
        - position 
        - scale (x, y) 
        - rotation (in degrees, clockwise) 
        - anchor point
        - size 
        - visible
        - z-order 
        - openGL z position 

        Default values: 
        - rotation: 0 
        - position: (x=0,y=0) 
        - scale: (x=1,y=1) 
        - contentSize: (x=0,y=0)
        - anchorPoint: (x=0,y=0)

        Limitations:
        - A cc.Node is a "void" object. It doesn't have a texture 

        Order in transformations with grid disabled 
        -# The node will be translated (position) 
        -# The node will be rotated (rotation)
        -# The node will be scaled (scale) 

*/
//definirame nov klas HelloWorld naslednik na Layer nasledqva
var Helloworld = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null, //nadpisa HelloWorld! koito se poqvqva
    circle:null,
    sprite:null,

//konstruktor
    init:function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size

        /*
            The CCDirector is a shared (singleton) object that takes care of navigating between scenes. 
            It knows which scene is currently active and allows you to change scenes by replacing the current 
            scene or pushing a new one onto the scene stack. When you push a new scene onto the stack, 
            the CCDirector pauses the previous scene but keeps it in memory. Later, when you pop the top 
            scene from the stack, the paused scene resumes from its last state.

            suzdava scena cc.Director
            cc.Director.getInstance()
            returns a shared instance of the director

            Since the cc.Director is a singleton, the standard way to use it is by calling:
            - cc.Director.getInstance().methodName(); 

            getWinSize()
            returns the size of the OpenGL view in points.
        */
        var size = cc.Director.getInstance().getWinSize();


        // dobavq "close" ikona na scenata za da moje da se izleze
        // it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png", // kartinkata predi izlizane
            "res/CloseSelected.png", //kogato e natisnata
            function () { //funkciqta koqto se izpulnqva pri  natiskane
                //history.go(-1); //The go() zarejda URL ot istoriqta na browsera -1 stranica
            },this);

        /*
            setAnchorPoint(point)
                Sets the anchor point in percent. 

                anchorPoint is the point around which all transformations and positioning manipulations take place. 
                It's like a pin in the node where it is "attached" to its parent. 
                The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left 
                corner and (1,1) means the top-right corner. 
                But you can use values higher than (1,1) and lower than (0,0) too. 
                The default anchorPoint is (0.5,0.5), so it starts in the center of the node.
        */
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));

        //  cc.Menu.create() create a new menu
        //there is no limit on how many menu item you can pass in
        var menu = cc.Menu.create(closeItem); //butona za izlizane e menu


        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        /*
            setPosition(newPosOrxValue, yValue)
            Changes the position (x,y) of the node in OpenGL coordinates Usually we use ccp(x,y) 
            to compose CCPoint object. The original point (0,0) is at the left-bottom corner of screen. 
            and Passing two numbers (x,y) is much efficient than passing CCPoint object.

            var size = cc.Director.getInstance().getWinSize();
            node.setPosition( cc.p(size.width/2, size.height/2) 
        */
        closeItem.setPosition(cc.p(size.width - 20, 20)); //butona za izlizane kude 6te e

       
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38); //suzdava nadpisa koito se poqvqva

        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.p(size.width / 2, 0)); // purvonachalna poziciq v sredta dolu
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        var lazyLayer = cc.Layer.create(); // nov sloi
        this.addChild(lazyLayer);  // dobavq kum HelloWorld layer

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create("res/HelloWorld.png");//za animaciq
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2)); // v nachaloto e posredata na ekrana
        this.sprite.setScale(0.5); //zamalena ot 1 na 0.5 na polovina
        this.sprite.setRotation(180); //zavurta se na 180 gradusa 

        lazyLayer.addChild(this.sprite, 0);
        /*
             {cc.RotateTo} cc.RotateTo.create(duration, deltaAngleX, deltaAngleY)
                creates the action with separate rotation angles
                // example
                var rotateTo = cc.RotateTo.create(2, 61.0);
                Parameters:
                {Number} duration
                duration in seconds
                {Number} deltaAngleX
                deltaAngleX in degrees.
                {Number} deltaAngleY Optional
                deltaAngleY in degrees.
        */
        var rotateToA = cc.RotateTo.create(2, 0); // za 2 sekundi da go prevurti do 0 gradusa
        var scaleToA = cc.ScaleTo.create(2, 1, 1); //za 2 sek go mashabira do 1 (normalno systoqnie ot 0.5)
        /*

        // example
        // create sequence with actions
        var seq = cc.Sequence.create(act1, act2);
        */
        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA)); //izpulnqva deistvieto edno sled dr
        this.helloLabel.runAction(
            cc.Spawn.create( // izpulnqva ednovremenno
                //cc.MoveBy()
                // Moves a CCNode object x,y pixels by modifying it's position attribute.
                cc.MoveBy.create(2.5, cc.p(0, size.height - 40)), // za 2,5 sek go izmestva s 0 px po X i -40 po Y 
                cc.TintTo.create(2.5,255,125,0) // za 2,5 sek smenq ot bqlo do oranjevo helloWorld
                )
            );

        this.setTouchEnabled(true); //za mobilni ustroistva da se dokosva
        return true;
    },

    // a selector callback
    
    menuCloseCallback:function (sender) {
        this.helloLabel.runAction(cc.TintTo(1, 0, 0, 0));
        cc.Director.getInstance().end();
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                //this.circle.setPosition(cc.p(touches[0].getLocation().x, touches[0].getLocation().y));
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () { 
    /*
            onEnter()
            This is run when ever a layer just become visible
    */

        this._super();
        var layer = new Helloworld(); /// suzdavash nov obekt ot class helloWorld
        layer.init();  //IZVIKVAME  KONSTRUKTORA
        this.addChild(layer);
    }
});

