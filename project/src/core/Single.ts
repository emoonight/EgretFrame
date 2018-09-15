class Single
{

    public static  Instance<T>(...args):T
    {
        let clz:any = this;

        if(!clz.m_instance)
        {
            switch(args.length)
            {
                case 0:
                    clz.m_instance = new clz();
                    break;
                case 1:
                    clz.m_instance = new clz(args[0]);
                    break;
                case 2:
                    clz.m_instance = new clz(args[0],args[1]);
                    break;
                case 3:
                    clz.m_instance = new clz(args[0],args[1],args[2]);
                    break;
                case 4:
                    clz.m_instance = new clz(args[0],args[1],args[2],args[4]);
                    break;
            }
        }

        return clz.m_instance 
    }
}