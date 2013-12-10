var MyHelloWorld = cc.Layer.extend({
    init:function()
    {
        this._super();

        var size = cc.Director.getInstance().getWinSize(); // get the size of the windows

        var EarthLayer = cc.Layer.create(); // create main layer
        this.addChild(EarthLayer); // add layer

    
        var BackgroundImage = cc.Sprite.create("res/helloworld.jpg"); // create sprite from image
        EarthLayer.addChild(BackgroundImage); // add to the main layer
        BackgroundImage.setScale(0.5);
        BackgroundImage.setPosition(cc.p(size.width / 2, size.height / 2));


        var helloLabel = cc.LabelTTF.create("Hello world!","Arial", 20); // create text Hello World!
        
        

        helloLabel.setPosition(cc.p(size.width / 3 , size.height / 2 )); // position in the middle
        helloLabel.setColor(new cc.Color3B ( 59,55,208 )); // set vilet color
        

        var rotationAmount = 0;
        var scale = 0.2;
        
        helloLabel.schedule(function()
            {
                this.setRotation(rotationAmount++);
                 
                if(rotationAmount > 360 && place == 4)
                    rotationAmount = 0;
                
                this.setScale(scale);
                scale+= 0.009;
                if(scale > 2)
                    scale =0.2;
            });

        

        EarthLayer.addChild(helloLabel); // add to the main layer
        

        return true;
    }
});



/*

        this._super();

        var s = cc.Director.getInstance().getWinSize();

        var layer1 = cc.LayerColor.create(new cc.Color4B(255, 255, 0, 255), 600, 600);
        //layer1.setPosition(new cc.Point(s.width/2,s.height/2));
        //layer1.setIsRelativeAnchorPoint(true);
        layer1.setAnchorPoint(new cc.Point(0.5,0.5));

        
        var helloLabel = cc.LabelTTF.create("Hello world", "Arial", 30);
        helloLabel.setPosition(new cc.Point(s.width/2,s.height/2));
        helloLabel.setColor(new cc.Color3B(255,0,0));
        var rotationAmount = 0;
        var scale = 1;
        helloLabel.schedule(function()
            {
                this.setRotation(rotationAmount++);
                if(rotationAmount > 360)
                    rotationAmount = 0;
                this.setScale(scale);
                scale+= 0.05;
                if(scale > 10)
                    scale =1;
            });

        layer1.addChild(helloLabel);
        this.addChild(layer1);

        
        return true;
    }

});
*/
var MyHelloScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MyHelloWorld;
        layer.init();
        this.addChild(layer);
    }
})
