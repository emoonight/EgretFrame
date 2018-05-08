class Layer extends egret.DisplayObjectContainer
{
    private m_layer:LayerType;
    public get Layer():LayerType
    {
        return this.m_layer;
    }

    constructor(layer:LayerType)
    {
        super();
        this.touchEnabled=false;
        this.touchChildren=true;
        this.m_layer = layer;

    }

}
