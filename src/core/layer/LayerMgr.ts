class LayerMgr
{
    [index:number]:Layer;

    private static s_instance:LayerMgr;
    public static get Instance():LayerMgr
    {
        if(LayerMgr.s_instance == null)
            LayerMgr.s_instance = new LayerMgr();
        
        return LayerMgr.s_instance;
    }

    public  addLayer(type:LayerType,stage:egret.Stage)
    {
        LayerMgr.s_instance[type] = new Layer(type);
        stage.addChild(LayerMgr.s_instance[type]);
    }


    public removeLayer(type:LayerType)
    {
        if(this[type] && this[type].parent)
        {
            this[type].parent.removeChild(this[type]);
            delete this[type];
        }
    }


    public  init(stage:egret.Stage)
    {
        this.addLayer(LayerType.SCENE,stage)
        this.addLayer(LayerType.ENTITY,stage)
        this.addLayer(LayerType.EFFECT,stage)
        this.addLayer(LayerType.UI,stage)
    }


    public getLayer(type:LayerType):Layer
    {
        return this[type];
    }
}

enum LayerType
{
    SCENE=0,        //场景
    ENTITY=1,       //实体
    EFFECT=2,       //特效
    UI=3,           //ui
    POP=4,          //弹出
    GUID=5          //指引
}






