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
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        var _this = _super.call(this) || this;
        if (StageUtils.uiStage == null) {
            StageUtils.uiStage = new eui.UILayer();
            StageUtils.uiStage.percentHeight = 100;
            StageUtils.uiStage.percentWidth = 100;
            StageUtils.uiStage.touchEnabled = false;
            _this.getStage().addChild(StageUtils.uiStage);
        }
        return _this;
    }
    /**
     * 获取舞台高度
     */
    StageUtils.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    /**
     * 获取舞台宽度
     */
    StageUtils.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    /**
     * 获取舞台
     */
    StageUtils.prototype.getStage = function () {
        return egret.lifecycle.stage;
    };
    /**
     * 获取ui舞台
     */
    StageUtils.prototype.getUIStage = function () {
        return StageUtils.uiStage;
    };
    /**
     * 指定舞台是否接收触摸事件
     * @param $val
     */
    StageUtils.prototype.setTouchChildren = function ($val) {
        this.getStage().touchChildren = $val;
    };
    /**
     * 指定舞台同时可以接收几个事件
     * @param $val
     */
    StageUtils.prototype.setMaxTouches = function ($val) {
        this.getStage().maxTouches = $val;
    };
    /**
     * 设置帧频
     * @param $val
     */
    StageUtils.prototype.setFrameRate = function ($val) {
        this.getStage().frameRate = $val;
    };
    /**
     * 设置缩放模式
     * @param $val
     */
    StageUtils.prototype.setScaleMode = function ($val) {
        this.getStage().scaleMode = $val;
    };
    /**
     * x 缩放
     * @param
     * @param
     */
    StageUtils.prototype.scaleX = function ($scaleX, $stage) {
        $stage.scaleX = $scaleX;
        $stage.x = this.gameWdith / 2 * (1 - $scaleX);
    };
    /**
     * y 缩放
     * @param
     * @param
     */
    StageUtils.prototype.scaleY = function ($scaleY, $stage) {
        $stage.scaleY = $scaleY;
        $stage.x = this.gameHeight / 2 * (1 - $scaleY);
    };
    /**
     * 全屏适配
     * @param designWidth
     * @param designHeight
     * @param resizeCallBack
     */
    StageUtils.prototype.startFullScreenAdaptation = function (designWidth, designHeight, resizeCallBack) {
        this.designWidth = designWidth;
        this.designHeight = designHeight;
        this.resizeCallback = resizeCallBack;
        this.stageOnResize();
    };
    /**
     * 重置舞台缩放
     */
    StageUtils.prototype.stageOnResize = function () {
        this.getStage().removeEventListener(egret.Event.RESIZE, this.stageOnResize, this);
        var designWidth = this.designWidth;
        var designHeight = this.designHeight;
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        var a = clientWidth / clientHeight;
        var b = designWidth / designHeight;
        var c = a / b;
        if (a > b) {
            var c1 = c;
            var c2 = c;
            designWidth = Math.floor(designWidth * c1);
            designHeight = Math.floor(designHeight * c2);
        }
        this.getStage().setContentSize(designWidth, designHeight);
        this.resizeCallback && this.resizeCallback();
        this.getStage().addEventListener(egret.Event.RESIZE, this.stageOnResize, this);
    };
    return StageUtils;
}(Single));
__reflect(StageUtils.prototype, "StageUtils");
