class LayerMgr
{

    private static s_instance:LayerMgr;
    public static get Instance():LayerMgr
    {
        if(LayerMgr.s_instance == null)
            LayerMgr.s_instance = new LayerMgr();
        
        return LayerMgr.s_instance;
    }


    public addLayer()
    {
        eui.UILayer
    }

}







