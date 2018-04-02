abstract class Controller implements IDispose
{
    protected m_view:View;

    protected abstract register();
    protected abstract remove();

    abstract dispose();
}
