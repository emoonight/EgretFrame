class Model
{
    protected m_ctrl:Controller;

    constructor($ctrl:Controller)
    {
        this.m_ctrl = $ctrl;
        this.m_ctrl.Model=this;
    }
}