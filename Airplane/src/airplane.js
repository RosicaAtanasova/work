
var Plane = cc.Layer.extend(
{

    

    init:function()
    {

        var AirLayer = cc.LayerColor.create(  // create layer from color
            new cc.Color4B(128,128,128,255),600,600);
        this.addChild(AirLayer);  // add the layer to the scene

        var jetSprite = cc.Sprite.create("res/jet.png"); // create a sprite from pic

        var size = cc.Director.getInstance().getWinSize(); ///take the si


      AirLayer.setPosition(new cc.Point(0.0,0.0));
      AirLayer.addChild(jetSprite); //add pic to the layer
      
      jetSprite.setPosition(new cc.Point(size.width /2 , size.height/2));
      //this.addChild(AirLayer);

        return true;
    }

    

});



AirScene = cc.Scene.extend({
    onEnter:function () { 
    
        this._super();
        var layer = new Plane(); /// suzdavash nov obekt ot class helloWorld
        layer.init();  //IZVIKVAME  KONSTRUKTORA
        this.addChild(layer);
    }
})

