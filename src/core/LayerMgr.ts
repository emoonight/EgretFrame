class LayerMgr
{

    private static s_instance:LayerMgr;
    public static get Instance():LayerMgr
    {
        if(LayerMgr.s_instance == null)
            LayerMgr.s_instance = new LayerMgr();
        
        return LayerMgr.s_instance;
    }


    public addLayer()
    {
        eui.UILayer
    }

}


abstract class  View extends egret.DisplayObjectContainer implements IDispose,IRun
{
    protected m_ctl:Controller;

    abstract update();
    abstract dispose();

    public abstract show();
    public abstract hide();

}


abstract class Controller implements IDispose
{
    protected m_view:View;

    protected abstract register();
    protected abstract remove();

    abstract dispose();
}


