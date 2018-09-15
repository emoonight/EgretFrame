class ImageAnalyzer implements RES.processor.Processor
{
    async  onLoadStart(host:RES.ProcessHost,res:LoadItemInfo):Promise<any>
    {
        let data = await host.load(res,RES.processor.ImageProcessor);
        res.loadBack.Notify(data,res);
        return data;
    }

    async onRemoveStart()
    {
        return Promise.resolve();
    }
}