class WGLMgr extends  Single
{   

    /**
     * 获取web gl 
     */
    public getWGL()
    {
        let gl:WebGLRenderingContext ;

        if(egret.WebGLUtils.checkCanUseWebGL())
        {
            let canvas = this.getCanvas();
            if(canvas)
            {
                gl = canvas.getContext('experimental-webgl',);
                if(gl)
                    return gl;
            }
        }

        return null;
    }

    /**
     * 获取画布
     */
    public getCanvas()
    {
        let canvasTags = document.getElementsByTagName('canvas');
        if(canvasTags.length > 0)
            return canvasTags[0];
        else
            return null;
    }

    /**
     * 创建 shader
     * type 必须是 gl.VERTEX_SHADER 或者 gl.FRAGMENT_SHADER 之一
     * source shader 原文
     */
    public createShader(gl:WebGLRenderingContext,type:number,source:string):WebGLShader
    {
        if(type != gl.VERTEX_SHADER && type !=gl.FRAGMENT_SHADER )
        {
            console.log('Error shader type');
            return void 0;
        }

        let shader = gl.createShader(type);
        gl.shaderSource(shader,source);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
        {
            console.log(gl.getShaderInfoLog(shader));
            return void 0;
        }

        return shader;
    }
}