class ControllerMgr extends Single
{
    private m_ctrlPool:{[key:number]:Controller}={};

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

    public getCtrollerModel<T extends Controller>(c:{new():T}):Model
    {
        let ctrl:T = this.getCtrl(c);
        return ctrl.Model;
    }
}
