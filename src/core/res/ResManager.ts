/**
 * 加载队列开5个， config 文件拆分加载 
 * 资源组策略加载
 * 
 */
class ResManager implements IRun
{
    private static s_instance:ResManager;
    public static get Instance():ResManager
    {
        if(ResManager.s_instance == null)
        {
            ResManager.s_instance = new ResManager();
        }
        return ResManager.s_instance;
    }

    public tickIndex;
    private static s_maxThread:number = 5;
    private m_thread:number = ResManager.s_maxThread;       //最大加载线程数量
    private m_buffer:Array<LoadItemInfo>=[];
    
    private m_loader:RES.ResourceLoader;
    private m_image:ImageAnalyzer;
    private m_json:JsonAnalyzer;

    constructor()
    {
        this.tickIndex = 0;
        RES.setMaxLoadingThread(ResManager.s_maxThread);
        this.m_loader = new RES.ResourceLoader();

        this.m_image = new ImageAnalyzer();
        this.m_json = new JsonAnalyzer();
    }

    // /**
    //  * 资源加载,根据资源类型去做不同分类处理，在加载队列满的时候先加入缓存挂起等待队列
    //  * @param url 地址
    //  * @param type 类型
    //  * @param call 回调
    //  */
    // public loadRes(url:string,type:string, call:Observer)
    // {
    //     switch(type)
    //     {
    //         case RES.ResourceItem.TYPE_IMAGE:
    //         case RES.ResourceItem.TYPE_JSON:
    //         case RES.ResourceItem.TYPE_SHEET:
    //         case RES.ResourceItem.TYPE_XML:
    //         default:
    //             return;
    //     }
    // }

    public async loadRes(url:string,call:Observer)
    {
        let lp = url.lastIndexOf('.')+1;
        let ls = url.lastIndexOf('/')+1;
        
        let r = new LoadItemInfo();
        r.url = url;
        r.type = url.substring(lp);
        r.name = url.substring(ls,lp-1);
        r.call = call;
        r.root="";
        this.m_buffer.push(r);
    }

    public getProcessor(type:string):RES.processor.Processor
    {
        switch(type)
        {
            case "png":
            case "jpeg":
            case "jpg":
                return this.m_image;
            case "json":
                return this.m_json;
            default:
                return null;
        }
    }

    
    public update(time:number)
    {
        if(this.m_thread > 0)   //一帧只加载一个资源
        {
            if(this.m_buffer.length > 0)
            {
                let r = this.m_buffer.shift()
                --this.m_thread;
                let t = this.getProcessor(r.type);
                this.m_loader.loadResource(r,t).then(function(v){
                    console.log("fill---------->"+v);       //成功 v 是加载的资源
                    RES.getRes(r.name);
                },function(resean){
                    console.log("resean----------->"+resean);   //失败
                });
            }
        }
    }

}


class LoadItemInfo implements RES.ResourceInfo
{
    url: string;
    type: string;
    root: string;
    name:string;

    call:Observer
}


