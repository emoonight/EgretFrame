class WGLScene extends Scene
{
    private m_shaderProgram:WebGLProgram

    
    public onEnter(id:number)
    {
        super.onEnter(id);


    }

    public getGL():WebGLRenderingContext
    {
        let gl:WebGLRenderingContext ;

        if(egret.WebGLUtils.checkCanUseWebGL())
        {
            let canvas = document.getElementsByTagName('canvas')[0]
            gl = canvas.getContext('experimental-webgl')
            
            if(gl)
                return gl ;
        }

        return null;
    }


    private buildShader()
    {

    }


    private createShader()
    {
        
    }

    private getCube(gl:WebGLRenderingContext)
    {
        let vertexBuffer = gl.createBuffer();   //创建顶点缓冲数据
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
        let verts = [
            //正面
            -1.0,-1.0,1.0,
            1.0,-1.0,1.0,
            1.0,1.0,1.0,
            -1.0,1.0,1.0,

            //背面
            -1.0,-1.0,-1.0,
            -1.0,1.0,-1.0,
            1.0,1.0,-1.0,
            1.0,-1.0,-1.0,

            //顶面
            -1.0,1.0,-1.0,
            -1.0,1.0,1.0,
            1.0,1.0,1.0,
            1.0,1.0,-1.0,

            //底面
            -1.0,-1.0,-1.0,
            1.0,-1.0,-1.0,
            1.0,-1.0,1.0,
            -1.0,-1.0,1.0,

            //右面
            1.0,-1.0,-1.0,
            1.0,1.0,-1.0,
            1.0,1.0,1.0,
            1.0,-1.0,1.0,

            //左面
            -1.0,-1.0,-1.0,
            -1.0,-1.0,1.0,
            -1.0,1.0,1.0,
            -1.0,1.0,-1.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.STATIC_DRAW);

        
        let colorBuffer = gl.createBuffer();    //颜色数据
        gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
        let faceColors = [
            [1.0,0.0,0.0,1.0],    //正面
            [0.0,1.0,0.0,1.0],    //背面
            [0.0,0.0,1.0,1.0],    //顶面
            [1.0,1.0,0.0,1.0],    //底面
            [1.0,1.0,0.0,1.0],    //右面
            [0.0,1.0,1.0,1.0],    //左面
        ];
        let vertexColors = [];
        for(let i in faceColors)
        {
            let colors = faceColors[i];
            for(let j = 0 ; j < 4; j++)
                vertexColors = vertexColors.concat(colors);
        }
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexColors),gl.STATIC_DRAW);


        let cubeIndexBuffer =gl.createBuffer();     //索引数据
        gl.bindBuffer(gl.ARRAY_BUFFER,cubeIndexBuffer);
        let cubeIndices = [
            8,1,2 , 8,2,3,      //正面
            4,5,6 , 4,6,7,      //背面
            8,9,10, 8,10,11,    //顶面
            12,13,14,12,14,15,  //底面
            16,17,18,16,18,19,  //右面
            20,21,22,20,22,23,  //左面
        ];
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(cubeIndices),gl.STATIC_DRAW);


        let cube = {
                        buffer:vertexBuffer,
                        colorBuffer:colorBuffer,
                        indices:cubeIndices,
                        vertSize:3,
                        nVerts:24,
                        colorSize:4,
                        nColors:24,
                        nIndices:36,
                        primtype:gl.TRIANGLES
                    };
        
        return cube;
    }

    private drawCube(gl:WebGLRenderingContext,obj)
    {   
        //顶点着色glsl 源码
        const vertexShaderStr = 'attribute vec3 vertexPos;\n'+
                                'attribute vec4 vertexColor;\n'+
                                'uniform mat4 modelViewMatrix;\n'+
                                'uniform mat4 projectionMatrix;\n'+
                                'varying vec4 vColor;\n'+
                                'void main(void){\n'+
                                //返回经过变换和投影的顶点值
                                ' gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos,1.0);\n'+
                                ' vColor = vertextColor;\n'+
                                '}\n';
                            
        //片段着色glsl 源码
        const fragementShaderStr = 'precision mediump float;\n'+
                                    'varying vec4 vColor;\n'+
                                    'void main(void){\n'+
                                    //始终输出白色
                                    ' gl_fragColor = vColor;\n'+
                                    '}\n';


        gl.clearColor(0.0,0.0,0.0,1.0); //黑色背景
        gl.enable(gl.DEPTH_TEST);   //深度测试
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}