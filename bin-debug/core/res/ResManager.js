var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 加载队列开5个， config 文件拆分加载
 * 资源组策略加载
 *
 */
var ResManager = (function () {
    function ResManager() {
        this.m_queue = ResManager.s_maxThread;
        RES.setMaxLoadingThread(ResManager.s_maxThread);
    }
    Object.defineProperty(ResManager, "Instance", {
        get: function () {
            if (ResManager.s_instance == null) {
                ResManager.s_instance = new ResManager();
            }
            return ResManager.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 资源加载,根据资源类型去做不同分类处理，在加载队列满的时候先加入缓存挂起等待队列
     * @param url 地址
     * @param type 类型
     * @param call 回调
     */
    ResManager.prototype.loadRes = function (url, type, call) {
        switch (type) {
            case RES.ResourceItem.TYPE_IMAGE:
            case RES.ResourceItem.TYPE_JSON:
            case RES.ResourceItem.TYPE_SHEET:
            case RES.ResourceItem.TYPE_XML:
            default:
                return;
        }
    };
    ResManager.s_maxThread = 5;
    return ResManager;
}());
__reflect(ResManager.prototype, "ResManager");
