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
var WGLScene = (function (_super) {
    __extends(WGLScene, _super);
    function WGLScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_vertexSource = 'attribute vec3 vertexPos;\n' +
            'attribute vec4 vertexColor;\n' +
            'uniform mat4 modelViewMatrix;\n' +
            'uniform mat4 projectionMatrix;\n' +
            'varying vec4 vColor;\n' +
            'void main(void){\n' +
            //返回经过变换和投影的顶点值
            ' gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos,1.0);\n' +
            ' vColor = vertexColor;\n' +
            '}\n';
        _this.m_fragmentSource = 'precision mediump float;\n' +
            'varying vec4 vColor;\n' +
            'void main(void){\n' +
            //始终输出白色
            ' gl_FragColor = vColor;\n' +
            '}\n';
        return _this;
    }
    WGLScene.prototype.onEnter = function (id) {
        _super.prototype.onEnter.call(this, id);
        var gl = this.getGL();
        this.buildShaderProgram(gl);
        var cube = this.getCube(gl);
        this.drawCube(gl, cube);
    };
    WGLScene.prototype.getGL = function () {
        var gl;
        if (egret.WebGLUtils.checkCanUseWebGL()) {
            var canvas = document.getElementsByTagName('canvas')[0];
            this.initMatrix(canvas);
            gl = canvas.getContext('experimental-webgl');
            if (gl)
                return gl;
        }
        return null;
    };
    WGLScene.prototype.initMatrix = function (canvas) {
        this.m_modelViewMatrix = mat4.create();
        mat4.translate(this.m_modelViewMatrix, this.m_modelViewMatrix, [0, 0, -3.333]);
        this.m_projectionMatrix = mat4.create();
        mat4.perspective(this.m_projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 1000);
    };
    WGLScene.prototype.buildShaderProgram = function (gl) {
        var vertexShader = this.createShader(gl, gl.VERTEX_SHADER, this.m_vertexSource);
        var fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, this.m_fragmentSource);
        this.m_shaderProgram = gl.createProgram();
        gl.attachShader(this.m_shaderProgram, vertexShader);
        gl.attachShader(this.m_shaderProgram, fragmentShader);
        gl.linkProgram(this.m_shaderProgram);
        this.m_shaderVertexPositionAttr = gl.getAttribLocation(this.m_shaderProgram, 'vertexPos');
        gl.enableVertexAttribArray(this.m_shaderVertexPositionAttr);
        this.m_shaderVertexColorAttr = gl.getAttribLocation(this.m_shaderProgram, 'vertexColor');
        gl.enableVertexAttribArray(this.m_shaderVertexColorAttr);
        this.m_shaderProjectionMatrixUniform = gl.getUniformLocation(this.m_shaderProgram, 'projectionMatrix');
        this.m_shaderModelViewMatrixUniform = gl.getUniformLocation(this.m_shaderProgram, 'modelViewMatrix');
        if (!gl.getProgramParameter(this.m_shaderProgram, gl.LINK_STATUS))
            console.log('shaderProgram init failed');
    };
    /**
     * type
     */
    WGLScene.prototype.createShader = function (gl, type, source) {
        if (type != gl.VERTEX_SHADER && type != gl.FRAGMENT_SHADER) {
            console.log('Error shader type');
            return void 0;
        }
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return void 0;
        }
        return shader;
    };
    WGLScene.prototype.getCube = function (gl) {
        var vertexBuffer = gl.createBuffer(); //创建顶点缓冲数据
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var verts = [
            //正面
            -1.0, -1.0, 1.0,
            1.0, -1.0, 1.0,
            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            //背面
            -1.0, -1.0, -1.0,
            -1.0, 1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, -1.0, -1.0,
            //顶面
            -1.0, 1.0, -1.0,
            -1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, -1.0,
            //底面
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0, 1.0,
            -1.0, -1.0, 1.0,
            //右面
            1.0, -1.0, -1.0,
            1.0, 1.0, -1.0,
            1.0, 1.0, 1.0,
            1.0, -1.0, 1.0,
            //左面
            -1.0, -1.0, -1.0,
            -1.0, -1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, 1.0, -1.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        var colorBuffer = gl.createBuffer(); //颜色数据
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        var faceColors = [
            [1.0, 0.0, 0.0, 1.0],
            [0.0, 1.0, 0.0, 1.0],
            [0.0, 0.0, 1.0, 1.0],
            [1.0, 1.0, 0.0, 1.0],
            [1.0, 1.0, 0.0, 1.0],
            [0.0, 1.0, 1.0, 1.0],
        ];
        var vertexColors = [];
        for (var i in faceColors) {
            var colors = faceColors[i];
            for (var j = 0; j < 4; j++)
                vertexColors = vertexColors.concat(colors);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);
        var cubeIndexBuffer = gl.createBuffer(); //索引数据
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeIndexBuffer);
        var cubeIndices = [
            8, 1, 2, 8, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeIndices), gl.STATIC_DRAW);
        var cube = {
            buffer: vertexBuffer,
            colorBuffer: colorBuffer,
            indices: cubeIndexBuffer,
            vertSize: 3,
            nVerts: 24,
            colorSize: 4,
            nColors: 24,
            nIndices: 36,
            primtype: gl.TRIANGLES
        };
        return cube;
    };
    WGLScene.prototype.drawCube = function (gl, obj) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); //黑色背景
        gl.enable(gl.DEPTH_TEST); //深度测试
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.m_shaderProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(this.m_shaderVertexPositionAttr, obj.vertSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
        gl.vertexAttribPointer(this.m_shaderVertexColorAttr, obj.colorSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);
        gl.uniformMatrix4fv(this.m_shaderProjectionMatrixUniform, false, this.m_projectionMatrix);
        gl.uniformMatrix4fv(this.m_shaderModelViewMatrixUniform, false, this.m_modelViewMatrix);
        gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
    };
    return WGLScene;
}(Scene));
__reflect(WGLScene.prototype, "WGLScene");
