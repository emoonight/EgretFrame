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

    private m_

    constructor()
    {
        RES.setMaxLoadingThread(ResManager.s_maxThread);
    }


    public loadRes(url:string,call:Action)
    {
        
    }


}


