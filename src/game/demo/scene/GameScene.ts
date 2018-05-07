class GameScene extends Scene
{
    private m_grids:GridNode[] =[];

    constructor()
    {
        super();

        //第一个当作 门 ，中间的当作 商店 ，最后当作其他
        let obs:number[] = MathUtils.randomRange(4,0,29);

        for(let i = 0 ; i < 30 ; i++)
        {
            let num = MathUtils.random(0,3);
            let node = new GridNode(i,num,this.getLayer(LayerType.Sc_Entity));
            this.m_grids.push(node);
        }

    }
}
