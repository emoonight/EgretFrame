var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Message = (function () {
    function Message() {
    }
    Message.NODE_BREAKE = "NODE_BREAKE"; //节点击碎
    Message.PASS_LEVEL = "PASS_LEVEL"; //过关消息
    return Message;
}());
__reflect(Message.prototype, "Message");
//# sourceMappingURL=Message.js.map