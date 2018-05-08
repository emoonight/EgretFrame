var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
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
var ResMgr = (function (_super) {
    __extends(ResMgr, _super);
    function ResMgr() {
        var _this = _super.call(this) || this;
        _this.m_thread = ResMgr.s_maxThread; //最大加载线程数量
        _this.m_buffer = [];
        _this.m_index = 0;
        _this.m_resPool = {};
        _this.tickIndex = 0;
        RES.setMaxLoadingThread(ResMgr.s_maxThread);
        _this.m_loader = new RES.ResourceLoader();
        _this.m_image = new ImageAnalyzer();
        _this.m_json = new JsonAnalyzer();
        return _this;
    }
    ResMgr.prototype.loadResorce = function (stage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //加载组资源前可以用loadres 去加载外部资源初始化界面
                    return [4 /*yield*/, this.loadConfigs()];
                    case 1:
                        //加载组资源前可以用loadres 去加载外部资源初始化界面
                        _a.sent();
                        this.m_index = 0;
                        return [4 /*yield*/, this.loadTheme(stage)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.loadGroups()];
                    case 3:
                        _a.sent();
                        this.m_index = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载配置表
     */
    ResMgr.prototype.loadConfigs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cfg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.m_index < ResMgr.s_cfg_arr.length)) return [3 /*break*/, 2];
                        cfg = ResMgr.s_cfg_arr[this.m_index];
                        return [4 /*yield*/, RES.loadConfig(cfg, ResUtils.ROOT)];
                    case 1:
                        _a.sent();
                        this.m_index++;
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载主题
     * @param stage 舞台
     */
    ResMgr.prototype.loadTheme = function (stage) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var theme = new eui.Theme(ResUtils.DEF_THM_JSON, stage);
                        theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                            resolve();
                        }, _this);
                    })];
            });
        });
    };
    ResMgr.prototype.loadGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var grp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.m_index < ResMgr.s_grp_arr.length)) return [3 /*break*/, 2];
                        grp = ResMgr.s_grp_arr[this.m_index];
                        return [4 /*yield*/, RES.loadGroup(grp)];
                    case 1:
                        _a.sent();
                        this.m_index++;
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载资源 该方式加载的资源不存于RES中
     * @param url 资源链接
     * @param call 回调
     */
    ResMgr.prototype.loadRes = function (url, call) {
        var lp = url.lastIndexOf('.') + 1;
        var ls = url.lastIndexOf('/') + 1;
        var r = new LoadItemInfo();
        r.url = url;
        r.type = url.substring(lp);
        r.name = url.substring(ls, lp - 1);
        r.resBack = call;
        r.loadBack = new Observer(this.onLoadCompelte, this);
        r.root = "";
        this.m_buffer.push(r);
    };
    ResMgr.prototype.getProcessor = function (type) {
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
    ResMgr.prototype.update = function (time) {
        if (this.m_thread > 0) {
            if (this.m_buffer.length > 0) {
                var r = this.m_buffer.shift();
                --this.m_thread;
                var t = this.getProcessor(r.type);
                this.m_loader.loadResource(r, t); //时间差?
            }
        }
    };
    ResMgr.prototype.onLoadCompelte = function (data, info) {
        console.log(data);
        if (data instanceof egret.Texture) {
        }
    };
    ResMgr.s_maxThread = 5;
    ResMgr.s_cfg_arr = [ResUtils.DEF_RES_JSON];
    ResMgr.s_grp_arr = [ResUtils.GRP_PRELOAD];
    return ResMgr;
}(Single));
__reflect(ResMgr.prototype, "ResMgr", ["IRun"]);
var LoadItemInfo = (function () {
    function LoadItemInfo() {
    }
    return LoadItemInfo;
}());
__reflect(LoadItemInfo.prototype, "LoadItemInfo", ["RES.ResourceInfo"]);
//# sourceMappingURL=ResMgr.js.map