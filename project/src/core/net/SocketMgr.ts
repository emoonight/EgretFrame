class SocketMgr
{
    private static s_instance:SocketMgr;
    public static get Instance():SocketMgr
    {
        if(SocketMgr.s_instance == null)
            SocketMgr.s_instance = new SocketMgr();
        
        return SocketMgr.s_instance;
    }

    private m_sock:egret.WebSocket;
    private m_buffer:egret.ByteArray;   //数据缓冲

    constructor()
    {
        this.m_sock = new egret.WebSocket();
        this.m_sock.addEventListener(egret.Event.CONNECT,this.onConnect,this);
        this.m_sock.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReveive,this);
    }

    
    public send(data:egret.ByteArray)
    {

    }

    /**
     * 发送心跳包 用于判断网络是否连接中 
     */
    private sendHeartPack()
    {

    }

    public connect(ip,port)
    {

    }

    public reconect()
    {

    }

    private onConnect()
    {

    }


    //数据收取
    private onReveive()
    {
        //读取数据头包，获取协议结构等信息
        //判断长度是否满足 满足解协议/不满足 压缓冲等待继续收取数据
        //协议解析完成 回调到model 进一步处理
    }
}