class App
{   
    //mgr
    public static get ScMgr(){ return SceneManger.Instance<SceneManger>(); }
    public static get tkMrg(){ return TickMgr.Instance<TickMgr>(); }

    //utils
    public static get stageUt(){ return StageUtils.Instance<StageUtils>(); }
}