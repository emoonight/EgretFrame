var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketMgr = (function () {
    function SocketMgr() {
        this.m_sock = new egret.WebSocket();
        this.m_sock.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this.m_sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReveive, this);
    }
    Object.defineProperty(SocketMgr, "Instance", {
        get: function () {
            if (SocketMgr.s_instance == null)
                SocketMgr.s_instance = new SocketMgr();
            return SocketMgr.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    SocketMgr.prototype.send = function (data) {
    };
    /**
     * 发送心跳包 用于判断网络是否连接中
     */
    SocketMgr.prototype.sendHeartPack = function () {
    };
    SocketMgr.prototype.connect = function (ip, port) {
    };
    SocketMgr.prototype.reconect = function () {
    };
    SocketMgr.prototype.onConnect = function () {
    };
    //数据收取
    SocketMgr.prototype.onReveive = function () {
        //读取数据头包，获取协议结构等信息
        //判断长度是否满足 满足解协议/不满足 压缓冲等待继续收取数据
        //协议解析完成 回调到model 进一步处理
    };
    return SocketMgr;
}());
__reflect(SocketMgr.prototype, "SocketMgr");
