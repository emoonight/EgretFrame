abstract class  DisplayController extends Controller
{
    protected abstract m_view:View; //场景

    protected abstract initMapView();
    protected abstract initEntity();

    protected abstract register();
    protected abstract remove();

    abstract dispose();
    abstract show(...args);
    abstract hide();
}