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
        LayerMgr.s_instance[type] = new Layer();
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

}

enum LayerType
{
    SCENE=0,
    ENTITY=1,
    EFFECT=2,
    UI=3
}






