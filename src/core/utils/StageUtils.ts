class StageUtils extends Single
{
    public gameWdith:number;
    public gameHeight:number;

    private designWidth:number;
    private designHeight:number;
    private resizeCallback:Function;

    //UIStage单例
    private static uiStage:eui.UILayer;
    //游戏Stage单例
    private static gameStage:egret.DisplayObjectContainer;

    constructor()
    {
        super();

        if(StageUtils.uiStage == null)
        {
            StageUtils.uiStage = new eui.UILayer();
            StageUtils.uiStage.percentHeight= 100;
            StageUtils.uiStage.percentWidth = 100;
            StageUtils.uiStage.touchEnabled = false;
            this.getStage().addChild(StageUtils.uiStage);
        }
    }

    /**
     * 获取舞台高度
     */
    public getHeight():number
    {
        return this.getStage().stageHeight;
    }

    /**
     * 获取舞台宽度
     */
    public getWidth():number
    {
        return this.getStage().stageWidth;
    }

    /**
     * 获取舞台
     */
    public getStage():egret.Stage
    {
        return egret.lifecycle.stage;
    }

    /**
     * 获取ui舞台
     */
    public getUIStage():eui.UILayer
    {
        return StageUtils.uiStage;
    }

    /**
     * 指定舞台是否接收触摸事件
     * @param $val 
     */
    public setTouchChildren($val:boolean):void
    {
        this.getStage().touchChildren = $val;
    }

    /**
     * 指定舞台同时可以接收几个事件
     * @param $val 
     */
    public setMaxTouches($val:number):void
    {
        this.getStage().maxTouches = $val;
    }

    /**
     * 设置帧频
     * @param $val 
     */
    public setFrameRate($val:number):void
    {
        this.getStage().frameRate = $val;
    }

    /**
     * 设置缩放模式
     * @param $val 
     */
    public setScaleMode($val:string):void
    {
        this.getStage().scaleMode=$val;
    }

    /**
     * x 缩放
     * @param  
     * @param  
     */    
    public scaleX($scaleX:number,$stage:any)
    {
        $stage.scaleX= $scaleX;
        $stage.x = this.gameWdith / 2 * (1 - $scaleX); 
    }

    /**
     * y 缩放
     * @param  
     * @param  
     */
    public scaleY($scaleY:number,$stage:any)
    {
        $stage.scaleY = $scaleY;
        $stage.x = this.gameHeight / 2 * (1 - $scaleY);
    }

    /**
     * 全屏适配
     * @param designWidth 
     * @param designHeight 
     * @param resizeCallBack 
     */
    public startFullScreenAdaptation(designWidth:number,designHeight:number,resizeCallBack:Function):void
    {
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.resizeCallback = resizeCallBack;

        this.stageOnResize();
    }

    /**
     * 重置舞台缩放
     */
    private stageOnResize():void
    {
        this.getStage().removeEventListener(egret.Event.RESIZE,this.stageOnResize,this);
        
        let designWidth:number = this.designWidth;
        let designHeight:number = this.designHeight;
        let clientWidth:number = window.innerWidth;
        let clientHeight:number = window.innerHeight;

        let a:number = clientWidth/clientHeight;
        let b:number = designWidth / designHeight;
        let c:number = a / b;

        if(a > b)
        {
            let c1 = c;
            let c2 = c;

            designWidth =Math.floor(designWidth * c1);
            designHeight = Math.floor(designHeight * c2);
        }

        this.getStage().setContentSize(designWidth,designHeight);

        this.resizeCallback && this.resizeCallback();
        this.getStage().addEventListener(egret.Event.RESIZE,this.stageOnResize,this);
    }
}
