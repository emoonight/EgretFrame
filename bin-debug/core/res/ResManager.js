var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 加载队列开5个， config 文件拆分加载
 * 资源组策略加载
 *
 */
var ResManager = (function () {
    function ResManager() {
        this.m_thread = ResManager.s_maxThread; //最大加载线程数量
        this.m_buffer = [];
        this.tickIndex = 0;
        RES.setMaxLoadingThread(ResManager.s_maxThread);
        this.m_loader = new RES.ResourceLoader();
        this.m_image = new ImageAnalyzer();
        this.m_json = new JsonAnalyzer();
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
    // /**
    //  * 资源加载,根据资源类型去做不同分类处理，在加载队列满的时候先加入缓存挂起等待队列
    //  * @param url 地址
    //  * @param type 类型
    //  * @param call 回调
    //  */
    // public loadRes(url:string,type:string, call:Observer)
    // {
    //     switch(type)
    //     {
    //         case RES.ResourceItem.TYPE_IMAGE:
    //         case RES.ResourceItem.TYPE_JSON:
    //         case RES.ResourceItem.TYPE_SHEET:
    //         case RES.ResourceItem.TYPE_XML:
    //         default:
    //             return;
    //     }
    // }
    ResManager.prototype.loadRes = function (url, call) {
        return __awaiter(this, void 0, void 0, function () {
            var lp, ls, r;
            return __generator(this, function (_a) {
                lp = url.lastIndexOf('.');
                ls = url.lastIndexOf('/');
                r = new LoadItemInfo();
                r.url = url;
                r.type = url.substring(lp);
                r.name = url.substring(lp, ls);
                r.call = call;
                this.m_buffer.push(r);
                return [2 /*return*/];
            });
        });
    };
    ResManager.prototype.getProcessor = function (type) {
        switch (type) {
            case "png":
            case "jpeg":
            case "jpg":
                return this.m_image;
            case "json":
                return this.m_json;
            default:
                return null;
        }
    };
    ResManager.prototype.update = function (time) {
        if (this.m_thread > 0) {
            var r = this.m_buffer.shift();
            --this.m_thread;
            var t = this.getProcessor(r.type);
            this.m_loader.loadResource(r, t).then(function (v) {
                console.log("fill---------->" + v);
            }, function (resean) {
                console.log("resean----------->" + resean);
            });
        }
    };
    ResManager.s_maxThread = 5;
    return ResManager;
}());
__reflect(ResManager.prototype, "ResManager", ["IRun"]);
var LoadItemInfo = (function () {
    function LoadItemInfo() {
    }
    return LoadItemInfo;
}());
__reflect(LoadItemInfo.prototype, "LoadItemInfo", ["RES.ResourceInfo"]);
//# sourceMappingURL=ResManager.js.map