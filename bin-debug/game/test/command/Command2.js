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
var cmd2;
(function (cmd2) {
    var Radio = (function () {
        function Radio() {
            this.m_volume = 0;
        }
        Radio.prototype.on = function () {
            console.log("radio is open...");
        };
        Radio.prototype.off = function () {
            console.log("radio is close...");
        };
        Radio.prototype.volumeUp = function () {
            ++this.m_volume;
        };
        Radio.prototype.volumeDown = function () {
            if (this.m_volume > 0)
                --this.m_volume;
        };
        return Radio;
    }());
    __reflect(Radio.prototype, "Radio", ["IElectronicDevice"]);
    var TurnVolumeDown = (function () {
        function TurnVolumeDown($device) {
            this.m_device = $device;
        }
        TurnVolumeDown.prototype.execute = function () {
            this.m_device.volumeDown();
        };
        TurnVolumeDown.prototype.unDo = function () {
            this.m_device.volumeUp();
        };
        return TurnVolumeDown;
    }());
    __reflect(TurnVolumeDown.prototype, "TurnVolumeDown", ["ICommand"]);
    var TurnVolumeUp = (function () {
        function TurnVolumeUp($device) {
            this.m_device = $device;
        }
        TurnVolumeUp.prototype.execute = function () {
            this.m_device.volumeUp();
        };
        TurnVolumeUp.prototype.unDo = function () {
            this.m_device.volumeDown();
        };
        return TurnVolumeUp;
    }());
    __reflect(TurnVolumeUp.prototype, "TurnVolumeUp", ["ICommand"]);
    var DeviceButton = (function () {
        function DeviceButton($cmd) {
            this.m_cmd = $cmd;
        }
        DeviceButton.prototype.press = function () {
            this.m_cmd.execute();
        };
        DeviceButton.prototype.pressUndo = function () {
            this.m_cmd.unDo();
        };
        return DeviceButton;
    }());
    __reflect(DeviceButton.prototype, "DeviceButton");
    var TVRemove = (function () {
        function TVRemove() {
        }
        TVRemove.getDevice = function () {
            return new Television();
        };
        return TVRemove;
    }());
    __reflect(TVRemove.prototype, "TVRemove");
    var Television = (function () {
        function Television() {
            this.m_volume = 0;
        }
        Television.prototype.on = function () {
            console.log("TV is on");
        };
        Television.prototype.off = function () {
            console.log("TV is off");
        };
        Television.prototype.volumeDown = function () {
            ++this.m_volume;
        };
        Television.prototype.volumeUp = function () {
            if (this.m_volume > 0)
                --this.m_volume;
        };
        return Television;
    }());
    __reflect(Television.prototype, "Television", ["IElectronicDevice"]);
    var TurnTVOff = (function () {
        function TurnTVOff($device) {
            this.m_device = $device;
        }
        TurnTVOff.prototype.execute = function () {
            this.m_device.off();
        };
        TurnTVOff.prototype.unDo = function () {
            this.m_device.on();
        };
        return TurnTVOff;
    }());
    __reflect(TurnTVOff.prototype, "TurnTVOff", ["ICommand"]);
    var TurnTVOn = (function () {
        function TurnTVOn($device) {
            this.m_device = $device;
        }
        TurnTVOn.prototype.execute = function () {
            this.m_device.on();
        };
        TurnTVOn.prototype.unDo = function () {
            this.m_device.off();
        };
        return TurnTVOn;
    }());
    __reflect(TurnTVOn.prototype, "TurnTVOn", ["ICommand"]);
    var TurnItAllOff = (function () {
        function TurnItAllOff($devices) {
            this.m_devices = $devices;
        }
        TurnItAllOff.prototype.execute = function () {
            this.m_devices.forEach(function (ie) {
                ie.off();
            }.bind(this));
        };
        TurnItAllOff.prototype.unDo = function () {
            this.m_devices.forEach(function (ie) { ie.on(); }.bind(this));
        };
        return TurnItAllOff;
    }());
    __reflect(TurnItAllOff.prototype, "TurnItAllOff", ["ICommand"]);
    var RunMian = (function (_super) {
        __extends(RunMian, _super);
        function RunMian() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RunMian.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var device = TVRemove.getDevice();
            var onCommand = new TurnTVOn(device);
            var onPressed = new DeviceButton(onCommand);
            onPressed.press();
            var volUpCommand = new TurnVolumeUp(device);
            onPressed = new DeviceButton(volUpCommand);
            onPressed.press();
            onPressed.press();
            onPressed.press();
            var volDownCommand = new TurnVolumeDown(device);
            onPressed = new DeviceButton(volDownCommand);
            onPressed.press();
            var tv = new Television();
            var radio = new Radio();
            var allDevices = new Array();
            allDevices.push(tv);
            allDevices.push(radio);
            var turnOffDevices = new TurnItAllOff(allDevices);
            var turnThemOff = new DeviceButton(turnOffDevices);
            turnThemOff.press();
            turnThemOff.pressUndo();
        };
        return RunMian;
    }(eui.UILayer));
    __reflect(RunMian.prototype, "RunMian");
})(cmd2 || (cmd2 = {}));
