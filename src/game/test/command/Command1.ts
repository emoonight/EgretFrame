module cmd1
{
    abstract class Command
    {
        public abstract execute();
        public abstract unExecute();
    }


    class CalculatorCommand extends Command
    {
        private m_operator:string;
        private m_operand:number;
        private m_cal:Calculator;

        constructor($cal:Calculator,$operator:string,$operand:number)
        {
            super();
            this.m_operator = $operator;
            this.m_operand = $operand;
            this.m_cal = $cal;
        }

        public set Operator($val:string)
        {
            this.m_operator = $val;
        }

        public set Operand($val:number)
        {
            this.m_operand = $val;
        }

        public execute()
        {
            this.m_cal.operation(this.m_operator,this.m_operand);
        }

        public unExecute()
        {
            this.m_cal.operation(this.unDo(this.m_operator),this.m_operand);
        }

        private unDo($operator:string):string
        {
            switch($operator)
            {
                case '+': return '-';
                case '-': return '+';
                case '*': return '/';
                case '/': return '*';
                default:
                    console.error("错误的操作符");
                    return "";
            }
        }
    }


    class User
    {
        private m_cal:Calculator = new Calculator();
        private m_cmdArr:Array<Command> = new Array<Command>();
        private m_current:number = 0;

        public  Redo($levels:number):void
        {
            for(let i = 0 ; i < $levels ; i++)
            {
                if(this.m_current < this.m_cmdArr.length -1)
                {
                    let cmd:Command = this.m_cmdArr[this.m_current++];
                    cmd.execute();
                }
            }
        }

        public Undo($levels:number)
        {
            for(let i = 0 ; i< $levels ; i++)
            {
                if(this.m_current > 0)
                {
                    let cmd:Command = this.m_cmdArr[--this.m_current];
                    cmd.unExecute();
                }
            }
        }

        public Compute($operator:string,$operand:number)
        {
            let cmd:Command = new CalculatorCommand(this.m_cal,$operator,$operand);
            cmd.execute();
            this.m_cmdArr.push(cmd);
            this.m_current++;
        }
    }


    class Calculator
    {
        private m_curr:number = 0;

        public operation($operator:string,$operand:number)
        {
            switch($operator)
            {
                case '+':
                    this.m_curr += $operand;
                    break;
                case '-':
                    this.m_curr -= $operand;
                    break;
                case '*':
                    this.m_curr *=$operand;
                    break;
                case '/':
                    this.m_curr /=$operand;
                    break;
            }
        }
    }


    class RunMain extends eui.UILayer
    {
        childrenCreated()
        {
            super.childrenCreated();

            let user:User = new User();

            user.Compute('+',100);
            user.Compute('-',50);
            user.Compute('*',10);
            user.Compute('/',2);

            user.Undo(4);

            user.Redo(3);
        }
    }
}