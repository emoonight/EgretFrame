class JsonAnalyzer implements RES.processor.Processor
{
    async onLoadStart(host:RES.ProcessHost,res:RES.ResourceInfo)
    {
        let data = await host.load(res,RES.processor.JsonProcessor);
        //json 解析
        console.log("资源是否有加载成功..........");
        console.table(data);
        return data;
    }

    async onRemoveStart()
    {
        return Promise.resolve();
    }
}