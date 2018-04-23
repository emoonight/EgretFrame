abstract class Controller implements IDispose
{
    protected abstract m_view:View;
    protected m_model:Model;


    public set Model($md:Model)
    {
        this.m_model = $md;
    }

    public get Model():Model
    {
        return this.m_model;
    }


    protected abstract register();
    protected abstract remove();

    abstract dispose();
    abstract show(...args);
    abstract hide();
}
