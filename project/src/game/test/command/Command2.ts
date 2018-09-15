module cmd2
{
    interface IElectronicDevice
    {
        on():void;
        off():void;
        volumeUp():void;
        volumeDown():void;
    }

    interface ICommand
    {
        execute():void
        unDo():void;
    }


    class Radio implements IElectronicDevice
    {
        protected m_volume = 0;

        public on():void
        {
            console.log("radio is open...");
        }

        public off():void
        {
            console.log("radio is close...");
        }

        public volumeUp():void
        {
            ++this.m_volume;
        }

        public volumeDown():void
        {
            if(this.m_volume > 0)
                --this.m_volume;
        }
    }


    class TurnVolumeDown implements ICommand
    {
        protected m_device:IElectronicDevice;

        constructor($device:IElectronicDevice)
        {
            this.m_device = $device;
        }

        public execute():void
        {
            this.m_device.volumeDown();
        }

        public unDo():void
        {
            this.m_device.volumeUp();
        }
    }


    class TurnVolumeUp implements ICommand
    {
        protected m_device:IElectronicDevice;

        constructor($device:IElectronicDevice)
        {
            this.m_device = $device;
        }

        public execute():void
        {
            this.m_device.volumeUp();
        }

        public unDo():void
        {
            this.m_device.volumeDown();
        }
    }

    class DeviceButton
    {
        private m_cmd:ICommand;

        constructor($cmd:ICommand)
        {
            this.m_cmd = $cmd;
        }

        public press():void
        {
            this.m_cmd.execute();
        }

        public pressUndo()
        {
            this.m_cmd.unDo();
        }
    }

    class TVRemove
    {
        public static getDevice():IElectronicDevice
        {
            return new Television();
        }
    }

    class Television implements IElectronicDevice
    {
        protected m_volume = 0;

        public on():void
        {
            console.log("TV is on");
        }

        public off():void
        {
            console.log("TV is off");
        }

        public volumeDown():void
        {
            ++this.m_volume;
        }

        public volumeUp():void
        {
            if(this.m_volume > 0 )
                --this.m_volume;
        }
    }
    
    class TurnTVOff implements ICommand
    {
        protected m_device:IElectronicDevice;

        constructor($device:IElectronicDevice)
        {
            this.m_device = $device;
        }

        public execute():void
        {
            this.m_device.off();
        }

        public unDo():void
        {
            this.m_device.on();
        }
    }

    class TurnTVOn implements ICommand
    {
        protected m_device:IElectronicDevice;

        constructor($device:IElectronicDevice)
        {
            this.m_device = $device;
        }

        public execute():void
        {
            this.m_device.on();
        }

        public unDo():void
        {
            this.m_device.off();
        }
    }

    class TurnItAllOff implements ICommand
    {
        protected m_devices:Array<IElectronicDevice>;

        constructor($devices:Array<IElectronicDevice>)
        {
            this.m_devices = $devices;
        }

        public execute():void
        {
            this.m_devices.forEach(function(ie){
                ie.off();
            }.bind(this));
        }

        public unDo():void
        {
            this.m_devices.forEach(function(ie){ie.on();}.bind(this))
        }
    }


    class RunMian extends eui.UILayer
    {

        childrenCreated()
        {
            super.childrenCreated();

            let device:IElectronicDevice = TVRemove.getDevice();

            let onCommand = new TurnTVOn(device);
            let onPressed = new DeviceButton(onCommand);
            onPressed.press();

            let volUpCommand = new TurnVolumeUp(device);
            onPressed = new DeviceButton(volUpCommand);
            onPressed.press();
            onPressed.press();
            onPressed.press();
            
            let volDownCommand = new TurnVolumeDown(device);
            onPressed = new DeviceButton(volDownCommand);
            onPressed.press();

            let tv:Television = new Television();
            let radio:Radio = new Radio();

            let allDevices:Array<IElectronicDevice> = new Array<IElectronicDevice>();
            allDevices.push(tv);
            allDevices.push(radio);

            let turnOffDevices =new TurnItAllOff(allDevices);
            let turnThemOff = new DeviceButton(turnOffDevices);
            turnThemOff.press();

            turnThemOff.pressUndo();
        }
    }
}