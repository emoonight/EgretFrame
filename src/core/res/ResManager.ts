/**
 * 加载队列开5个， config 文件拆分加载 
 * 资源组策略加载
 * 
 */
class ResManager
{
    private static s_maxThread:number = 5;

    private static s_instance:ResManager;
    public static get Instance():ResManager
    {
        if(ResManager.s_instance == null)
        {
            ResManager.s_instance = new ResManager();
        }
        return ResManager.s_instance;
    }

    private m_queue:number = ResManager.s_maxThread;

    constructor()
    {
        RES.setMaxLoadingThread(ResManager.s_maxThread);
    }

    /**
     * 资源加载,根据资源类型去做不同分类处理，在加载队列满的时候先加入缓存挂起等待队列
     * @param url 地址
     * @param type 类型
     * @param call 回调
     */
    public loadRes(url:string,type:string, call:Observer)
    {
        switch(type)
        {
            case RES.ResourceItem.TYPE_IMAGE:
            case RES.ResourceItem.TYPE_JSON:
            case RES.ResourceItem.TYPE_SHEET:
            case RES.ResourceItem.TYPE_XML:
            default:
                return;
        }
    }
    

}


