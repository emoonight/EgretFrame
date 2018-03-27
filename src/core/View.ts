abstract class  View extends egret.DisplayObjectContainer implements IDispose,IRun
{

    public tickIndex:number;    //
    
    protected m_ctl:Controller;

    abstract update(time:number);
    abstract dispose();

    public abstract show();
    public abstract hide();

}