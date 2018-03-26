/**
 * 加载队列开5个， 
 */

class ResManager
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

    constructor()
    {
        RES.setMaxLoadingThread(5);
    }


    public loadConfig()
    {
    }

}