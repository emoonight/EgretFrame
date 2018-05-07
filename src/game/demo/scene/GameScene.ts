class GameScene extends Scene
{
    private m_grids:GridNode[] =[];

    constructor()
    {
        super();


        for(let i = 0 ; i < 30 ; i++)
        {
            let num = MathUtils.Random(0,3);
            let node = new GridNode(i,num,this.getLayer(LayerType.Sc_Entity));
            this.m_grids.push(node);
        }

    }
}
