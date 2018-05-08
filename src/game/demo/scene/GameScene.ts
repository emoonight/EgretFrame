class GameScene extends Scene
{
    private m_grids:GridNode[] =[];

    constructor()
    {
        super();

    }

    public renderNodes()
    {
        let arr = this.createNode();
        for(let i = 0 ; i < 30 ; i++)
        {
            let node = new GridNode(i,arr[i],this.getLayer(LayerType.Sc_Effect));
            this.m_grids.push(node);
        }
    }


    public onEnter(id:number)
    {
        super.onEnter(id);
        this.renderNodes();

        Emitter.Register(Message.PASS_LEVEL,this.onPassLevel,this);
    }

    private createNode()
    {
        let len = 30;
        let arr = new Array<number>(30);

        let seed = MathUtils.random(0,29);
        arr[seed] = 0;

        let shop=0;
        while(shop<2)
        {
            seed = MathUtils.random(0,29);
            if(arr[seed] == void 0)
            {
                arr[seed] = 1;
                shop++;
            }
        }

        for(let i =0 ; i < len ; i++)
            if(arr[i] == void 0)
                arr[i] = 2;
        
        return arr;
    }

    private onPassLevel()
    {
        if(this.m_grids.filter((node)=>{
            return node.state;
        }).length>=27)
        {
            this.clearNodes();
            this.renderNodes();
        }
    }

    private clearNodes()
    {
        this.m_grids.forEach((node)=>{
            node = void 0;
        });

        this.m_grids=[];
    }
}
