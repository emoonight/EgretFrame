class App
{   
    //mgr
    public static get ScMgr(){ return SceneMgr.Instance<SceneMgr>(); }
    public static get tkMgr(){ return TickMgr.Instance<TickMgr>(); }
    public static get resMgr(){ return ResMgr.Instance<ResMgr>(); }
    public static get wglMgr(){ return WGLMgr.Instance<WGLMgr>(); }

    //utils
    public static get stageUt(){ return StageUtils.Instance<StageUtils>(); }

}