/**
 * 加载队列开5个， config 文件拆分加载 
 * 资源组策略加载
 * 
 */
class ResMgr implements IRun
{
    private static s_instance:ResMgr;
    public static get Instance():ResMgr
    {
        if(ResMgr.s_instance == null)
        {
            ResMgr.s_instance = new ResMgr();
        }
        return ResMgr.s_instance;
    }
    private static s_maxThread:number = 5;
    private static s_cfg_arr=[resUtils.DEF_RES_JSON];
    private static s_grp_arr=[resUtils.GRP_PRELOAD];


    public tickIndex;
    private m_thread:number = ResMgr.s_maxThread;       //最大加载线程数量
    private m_buffer:Array<LoadItemInfo>=[];
    
    private m_loader:RES.ResourceLoader;
    private m_image:ImageAnalyzer;
    private m_json:JsonAnalyzer;

    private m_index = 0;
    private m_resPool={};

    constructor()
    {
        this.tickIndex = 0;
        RES.setMaxLoadingThread(ResMgr.s_maxThread);
        this.m_loader = new RES.ResourceLoader();

        this.m_image = new ImageAnalyzer();
        this.m_json = new JsonAnalyzer();
    }


    public async loadResorce(stage:egret.Stage)
    {
        //加载组资源前可以用loadres 去加载外部资源初始化界面

        await this.loadConfigs();
        this.m_index = 0;
        await this.loadTheme(stage);
        await this.loadGroups();
        this.m_index = 0;

    }

    /**
     * 加载配置表
     */
    private async loadConfigs()
    {
        while(this.m_index < ResMgr.s_cfg_arr.length)
        {
            let cfg = ResMgr.s_cfg_arr[this.m_index];
            await RES.loadConfig(cfg,resUtils.ROOT)
            this.m_index++;
        }
    }

    /**
     * 加载主题
     * @param stage 舞台
     */
    private async loadTheme(stage:egret.Stage)
    {
        return new Promise((resolve,reject)=>{
            let theme = new eui.Theme(resUtils.DEF_THM_JSON,stage);
            theme.addEventListener(eui.UIEvent.COMPLETE,()=>{
                resolve();
            },this);
        });
    }


    private async loadGroups()
    {
        while(this.m_index < ResMgr.s_grp_arr.length)
        {
            let grp = ResMgr.s_grp_arr[this.m_index];
            await RES.loadGroup(grp)
            this.m_index++;
        }
    }

    /**
     * 加载资源 该方式加载的资源不存于RES中
     * @param url 资源链接
     * @param call 回调
     */
    public async loadRes(url:string,call:Observer)
    {
        let lp = url.lastIndexOf('.')+1;
        let ls = url.lastIndexOf('/')+1;
        
        let r = new LoadItemInfo();
        r.url = url;
        r.type = url.substring(lp);
        r.name = url.substring(ls,lp-1);
        r.resBack = call;
        r.loadBack = new Observer(this.onLoadCompelte,this);
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
                this.m_loader.loadResource(r,t);    //时间差?
            }
        }
    }


    private onLoadCompelte(data,info:LoadItemInfo)
    {
        console.log(data);

        if(data instanceof egret.Texture)
        {
        }
    }


}


class LoadItemInfo implements RES.ResourceInfo
{
    url: string;
    type: string;
    root: string;
    name:string;

    resBack:Observer; //资源请求加载点的回调
    loadBack:Observer;  //加载完成回调
    
}


