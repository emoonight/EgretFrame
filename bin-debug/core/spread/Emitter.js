"use strict";
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Emitter = (function () {
    function Emitter() {
    }
    //事件注册
    Emitter.Register = function (name, callback, context) {
        var observers = Emitter.m_listener[name];
        if (!observers) {
            Emitter.m_listener[name] = [];
        }
        Emitter.m_listener[name].push(new Observer(callback, context));
    };
    //事件移除
    Emitter.Remove = function (name, callback, context) {
        var observers = Emitter.m_listener[name];
        if (!observers)
            return;
        var len = observers.length;
        for (var i = 0; i < len; i++) {
            var obs = observers[i];
            if (obs.Compare(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete Emitter.m_listener[name];
        }
    };
    //发送
    Emitter.Send = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var observers = Emitter.m_listener[name];
        if (!observers)
            return;
        var len = observers.length;
        for (var i = 0; i < len; i++) {
            var obs = observers[i];
            obs.Notify.apply(obs, args);
        }
    };
    Emitter.m_listener = {};
    return Emitter;
}());
exports.Emitter = Emitter;
__reflect(Emitter.prototype, "\"e:/egret/Frame/EgretFrame/src/core/spread/Emitter\".Emitter");
//# sourceMappingURL=Emitter.js.map