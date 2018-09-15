/**
 * 场景基类
 */
class Scene implements IDispose
{
    public Stage:egret.DisplayObjectContainer;
    public SceneId:number;

    private m_isInit:boolean;
    private m_layers:{[index:number]:Layer}={};
    private m_autoReleaseResource:string[] =[];
    private m_releaseResource:boolean;

    public constructor()
    {
        this.Stage = new egret.DisplayObjectContainer();
        this.Stage.touchEnabled = false;
        this.Stage.touchChildren = true;
        this.Stage.touchEnabled = true;

        this.m_isInit = false;
        this.m_releaseResource =true;

        this.addLayer(LayerType.Sc_Bg);
        this.addLayer(LayerType.Sc_Terren);
        this.addLayer(LayerType.Sc_Entity);
        this.addLayer(LayerType.Sc_Effect);
    }


    public init($sceneId:number = undefined):void
    {
        this.m_isInit = true;
        this.SceneId = $sceneId;
    }

    public autoRes(resName:string):any
    {
        this.m_autoReleaseResource.push(resName);
        return RES.getRes(resName);
    }

    public onEnter($sceneId:number):void
    {
        if(!($sceneId == this.SceneId && this.m_isInit))
            this.init(this.SceneId);
        
        this.addSceneToStage();
    }

    public onExit():void
    {
        
    }

    public addLayer($type:LayerType):void
    {
        let layer = new Layer($type);
        this.m_layers[$type] = layer;

        let stage =this.Stage;
        let isTop = true;
        for(let i = 0 ; i < stage.numChildren;++i)
        {
            let child =<Layer>stage.getChildAt(i);
            if(child && ($type < child.Layer))
            {
                stage.addChildAt(layer,i);
                isTop = false;
                break;
            }
        }

        if(isTop)
            stage.addChild(layer);
    }

    public getLayer($type:LayerType):Layer
    {
        return this.m_layers[$type];
    }

    public addSceneToStage()
    {
        App.stageUt.getStage().addChildAt(this.Stage,0);
    }

    public removeSceneFromStage()
    {
        App.stageUt.getStage().removeChild(this.Stage);
    }

    public dispose()
    {
        this.m_autoReleaseResource.forEach(function(url:string){
            RES.destroyRes(url);
        });
    }
}