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
var cmd1;
(function (cmd1) {
    var Command = (function () {
        function Command() {
        }
        return Command;
    }());
    __reflect(Command.prototype, "Command");
    var CalculatorCommand = (function (_super) {
        __extends(CalculatorCommand, _super);
        function CalculatorCommand($cal, $operator, $operand) {
            var _this = _super.call(this) || this;
            _this.m_operator = $operator;
            _this.m_operand = $operand;
            _this.m_cal = $cal;
            return _this;
        }
        Object.defineProperty(CalculatorCommand.prototype, "Operator", {
            set: function ($val) {
                this.m_operator = $val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CalculatorCommand.prototype, "Operand", {
            set: function ($val) {
                this.m_operand = $val;
            },
            enumerable: true,
            configurable: true
        });
        CalculatorCommand.prototype.execute = function () {
            this.m_cal.operation(this.m_operator, this.m_operand);
        };
        CalculatorCommand.prototype.unExecute = function () {
            this.m_cal.operation(this.unDo(this.m_operator), this.m_operand);
        };
        CalculatorCommand.prototype.unDo = function ($operator) {
            switch ($operator) {
                case '+': return '-';
                case '-': return '+';
                case '*': return '/';
                case '/': return '*';
                default:
                    console.error("错误的操作符");
                    return "";
            }
        };
        return CalculatorCommand;
    }(Command));
    __reflect(CalculatorCommand.prototype, "CalculatorCommand");
    var User = (function () {
        function User() {
            this.m_cal = new Calculator();
            this.m_cmdArr = new Array();
            this.m_current = 0;
        }
        User.prototype.Redo = function ($levels) {
            for (var i = 0; i < $levels; i++) {
                if (this.m_current < this.m_cmdArr.length - 1) {
                    var cmd = this.m_cmdArr[this.m_current++];
                    cmd.execute();
                }
            }
        };
        User.prototype.Undo = function ($levels) {
            for (var i = 0; i < $levels; i++) {
                if (this.m_current > 0) {
                    var cmd = this.m_cmdArr[--this.m_current];
                    cmd.unExecute();
                }
            }
        };
        User.prototype.Compute = function ($operator, $operand) {
            var cmd = new CalculatorCommand(this.m_cal, $operator, $operand);
            cmd.execute();
            this.m_cmdArr.push(cmd);
            this.m_current++;
        };
        return User;
    }());
    __reflect(User.prototype, "User");
    var Calculator = (function () {
        function Calculator() {
            this.m_curr = 0;
        }
        Calculator.prototype.operation = function ($operator, $operand) {
            switch ($operator) {
                case '+':
                    this.m_curr += $operand;
                    break;
                case '-':
                    this.m_curr -= $operand;
                    break;
                case '*':
                    this.m_curr *= $operand;
                    break;
                case '/':
                    this.m_curr /= $operand;
                    break;
            }
        };
        return Calculator;
    }());
    __reflect(Calculator.prototype, "Calculator");
    var RunMain = (function (_super) {
        __extends(RunMain, _super);
        function RunMain() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RunMain.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var user = new User();
            user.Compute('+', 100);
            user.Compute('-', 50);
            user.Compute('*', 10);
            user.Compute('/', 2);
            user.Undo(4);
            user.Redo(3);
        };
        return RunMain;
    }(eui.UILayer));
    __reflect(RunMain.prototype, "RunMain");
})(cmd1 || (cmd1 = {}));
