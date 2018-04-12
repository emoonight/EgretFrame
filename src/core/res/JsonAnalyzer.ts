class JsonAnalyzer implements RES.processor.Processor
{
    async onLoadStart(host:RES.ProcessHost,res:RES.ResourceInfo)
    {
        let data = await host.load(res,RES.processor.JsonProcessor);
        return data;
    }

    async onRemoveStart()
    {
        return Promise.resolve();
    }
}