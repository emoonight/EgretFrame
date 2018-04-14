abstract class Controller implements IDispose
{
    protected abstract m_view:View;

    protected abstract register();
    protected abstract remove();

    abstract dispose();
    abstract show(...args);
    abstract hide();
}
