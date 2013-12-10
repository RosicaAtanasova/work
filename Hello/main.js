
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
        ctor:function (scene) {
            this._super();
            this.startScene = scene;
            cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
            cc.initDebugSetting();
            cc.setup(this.config['tag']);
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        },

        applicationDidFinishLaunching:function () {
            if(cc.RenderDoesnotSupport()){
                //show Information to user
                alert("Browser doesn't support WebGL");
                return false;
            }
            // initialize director
            var director = cc.Director.getInstance();

            cc.EGLView.getInstance()._resizeWithBrowserSize(true);
            cc.EGLView.getInstance().setDesignResolutionSize(800, 450, cc.RESOLUTION_POLICY.SHOW_ALL);

            // turn on display FPS
            director.setDisplayStats(this.config['showFPS']);

            // set FPS. the default value is 1.0/60 if you don't call this
            director.setAnimationInterval(1.0 / this.config['frameRate']);

            //load resources
            cc.LoaderScene.preload(g_resources, function () {
                director.replaceScene(new this.startScene());
            }, this);

            return true;
        }
});

        //********************************** Dobavqne na scena   *******************************
        //********************************** Dobavqne na scena   *******************************

var myFirstApp = new cocos2dApp(MyHelloScene); // na myApp poslednata funkciq



        //********************************** Dobavqne na scena   *******************************
        //********************************** Dobavqne na scena   *******************************
