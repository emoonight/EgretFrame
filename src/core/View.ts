abstract class  View extends egret.DisplayObjectContainer implements IDispose,IRun
{
    protected m_ctl:Controller;

    abstract update();
    abstract dispose();

    public abstract show();
    public abstract hide();

}