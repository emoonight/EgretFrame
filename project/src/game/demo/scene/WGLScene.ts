class WGLScene extends Scene
{

    private m_modelViewMatrix;
    private m_projectionMatrix;

    private m_shaderProgram:WebGLProgram;

    private m_vertexSource = 'attribute vec3 vertexPos;\n'+
                            'attribute vec4 vertexColor;\n'+
                            'uniform mat4 modelViewMatrix;\n'+
                            'uniform mat4 projectionMatrix;\n'+
                            'varying vec4 vColor;\n'+
                            'void main(void){\n'+
                            //返回经过变换和投影的顶点值
                            ' gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos,1.0);\n'+
                            ' vColor = vertextColor;\n'+
                            '}\n';
    

    private m_fragmentSource = 'precision mediump float;\n'+
                                'varying vec4 vColor;\n'+
                                'void main(void){\n'+
                                //始终输出白色
                                ' gl_fragColor = vColor;\n'+
                                '}\n';

    
    private m_shaderVertexPositionAttr:number;
    private m_shaderProjectionMatrixUniform:WebGLUniformLocation;
    private m_shaderModelViewMatrixUniform:WebGLUniformLocation;
    

    public onEnter(id:number)
    {
        super.onEnter(id);

        let gl = this.getGL();
        this.buildShaderProgram(gl);

        let cube = this.getCube(gl);
        this.drawCube(gl,cube);
    }

    public getGL():WebGLRenderingContext
    {
        let gl:WebGLRenderingContext ;

        if(egret.WebGLUtils.checkCanUseWebGL())
        {
            let canvas = document.getElementsByTagName('canvas')[0]
            gl = canvas.getContext('experimental-webgl')
            
            if(gl)
                return gl;
        }

        return null;
    }


    private initMatrix(canvas:HTMLCanvasElement)
    {
        
    }


    private buildShaderProgram(gl:WebGLRenderingContext)
    {
        let vertexShader = this.createShader(gl,gl.VERTEX_SHADER,this.m_vertexSource);
        let fragmentShader = this.createShader(gl,gl.FRAGMENT_SHADER,this.m_fragmentSource);

        this.m_shaderProgram = gl.createProgram();
        gl.attachShader(this.m_shaderProgram,vertexShader);
        gl.attachShader(this.m_shaderProgram,fragmentShader);

        this.m_shaderVertexPositionAttr = gl.getAttribLocation(this.m_shaderProgram,'vertexPos');
        gl.enableVertexAttribArray(this.m_shaderVertexPositionAttr);

        this.m_shaderProjectionMatrixUniform = gl.getUniformLocation(this.m_shaderProgram,'projectionMatrix');
        this.m_shaderModelViewMatrixUniform = gl.getUniformLocation(this.m_shaderProgram,'modelViewMatrix');

        if(!gl.getProgramParameter(this.m_shaderProgram,gl.LINK_STATUS))
            console.log('shaderProgram init failed');
    }

    /**
     * type 
     */
    private createShader(gl:WebGLRenderingContext,type:number,source:string):WebGLShader
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
        gl.clearColor(0.0,0.0,0.0,1.0); //黑色背景
        gl.enable(gl.DEPTH_TEST);   //深度测试
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(this.m_shaderProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER,obj.buffer);
        gl.vertexAttribPointer(this.m_shaderVertexPositionAttr,obj.vertSize,gl.FLOAT,false,0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER,obj.colorBuffer);
        gl.vertexAttribPointer(this.m_shaderVertexPositionAttr,obj.colorSize,gl.FLOAT,false,0,0);

        gl.bindBuffer(gl.ARRAY_BUFFER,obj.indices);

    }
}