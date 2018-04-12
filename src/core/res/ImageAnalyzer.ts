class ImageAnalyzer implements RES.processor.Processor
{
    async  onLoadStart(host:RES.ProcessHost,res:RES.ResourceInfo):Promise<any>
    {
        let data = await host.load(res,RES.processor.ImageProcessor);
        console.log("------------>root+"+res.root);
        console.log("------------>name+"+res.name);
        return data;
    }

    async onRemoveStart()
    {
        return Promise.resolve();
    }
}