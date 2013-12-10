   var MySecondApp = cc.Layer.extend(
{
    init:function()
    {
        var layer1 = cc.LayerColor.create( //suzdavame layer
            new cc.Color4B(128, 128, 128, 255), 600, 600), // ot cvqt s razmer
            jetSprite = cc.Sprite.create("images/jet.png");

        var size = cc.Director.getInstance().getWinSize();

        /************   na kartinkata razmera na dve  ********************

             jetSprite.setPosition(new cc.Point(
            size.width - jetSprite.getContentSize().width/2, 
            size.height - jetSprite.getContentSize().height/2));

        

*/


       layer1.setPosition(new cc.Point(0.0,0.0)); 

        layer1.addChild(jetSprite);

        jetSprite.setPosition(new cc.Point(size.width/2,size.height/2));  // pozicionirame samoleta v sredata

        this.addChild(layer1); // dobavqme go na 



        
        return true;
    }
});


MySecondAppScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MySecondApp();
		layer.init();
		this.addChild(layer);
	}
})

