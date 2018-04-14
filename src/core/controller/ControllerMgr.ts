class ControllerMgr 
{
    private static s_instance:ControllerMgr;
    public static get Instance():ControllerMgr
    {
        if(ControllerMgr.s_instance == null)
            ControllerMgr.s_instance = new ControllerMgr();
        
        return ControllerMgr.s_instance;
    }
    
    private m_ctrlPool:{[key:string]:Controller}={};

    public getCtrl<T extends Controller>(c:{new():T}):T
    {
        let k = c["name"];
        if(!this.m_ctrlPool[k])
        {
            this.m_ctrlPool[k]=new c();
        }

        return <T>this.m_ctrlPool[k];
    }

    public show<T extends Controller>(c:{new():T},...args):void
    {
        let ctrl:T = this.getCtrl(c);
        ctrl.show(args);
    }

    public hide<T extends Controller>(c:{new():T}):void
    {
        let ctrl:T = this.getCtrl(c);
        ctrl.hide();
    }
}
