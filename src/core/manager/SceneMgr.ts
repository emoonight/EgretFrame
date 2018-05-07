class SceneMgr extends Single
{
    private m_sceneMap:{[key:number]:new()=>Scene};
    private m_currScene:{key:number,scene:Scene};

    constructor()
    {
        super();
        this.m_sceneMap={};
    }

    public register($key:number,scene:{new():Scene}):void
    {
        this.m_sceneMap[$key] = scene;
    }    

    public runScene($key:number,...param):void
    {
        let nowScene:Scene = new this.m_sceneMap[$key]();
        if(!nowScene)
        {
            console.warn("key "+$key+" 未注册");
            return;
        }

        if(this.m_currScene)
            this.m_currScene.scene.onExit();

        nowScene.onEnter.apply(nowScene,param);
        this.m_currScene={key:$key,scene:nowScene};
    }

    public clear()
    {
        if(this.m_currScene)
        {
            this.m_currScene.scene.onExit();
            this.m_currScene=undefined;
        }

        this.m_sceneMap ={};
    }

    public get CurrSceneId():number
    {
        return this.m_currScene.key;
    }

    public getCurrScene():Scene
    {
        return this.m_currScene.scene;
    }
}

