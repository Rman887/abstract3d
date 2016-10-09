goog.provide("engine3D.Shader");

class Shader {
    /** Creates a new shader program with the code of a vertex and fragment shader */
    constructor(vertexShaderCode, fragmentShaderCode) {
        this.uniformLocs = {};
        
        // Compile the shaders and create the program
        this.vertexShaderID = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShaderID = gl.createShader(gl.FRAGMENT_SHADER);
        
        gl.shaderSource(this.vertexShaderID, vertexShaderCode);
        gl.compileShader(this.vertexShaderID);
        if (!gl.getShaderParameter(this.vertexShaderID, gl.COMPILE_STATUS))
            console.log("Unable to compile vertex shader:\n" + gl.getShaderInfoLog(this.vertexShaderID));
        
        gl.shaderSource(this.fragmentShaderID, fragmentShaderCode);
        gl.compileShader(this.fragmentShaderID);
        if (!gl.getShaderParameter(this.fragmentShaderID, gl.COMPILE_STATUS))
            console.log("Unable to compile fragment shader:\n" + gl.getShaderInfoLog(this.fragmentShaderID));
        
        this.programID = gl.createProgram();
        gl.attachShader(this.programID, this.vertexShaderID);
        gl.attachShader(this.programID, this.fragmentShaderID);
        gl.linkProgram(this.programID);
        if (!gl.getProgramParameter(this.programID, gl.LINK_STATUS))
            console.log("Unable to link shader program");
    }
    
    /** Makes webgl use this shader now. */
    useProgram() {
        gl.useProgram(this.programID);
    }
    
    /** Adds a uniform variable from the shader code. The type corresponds to the GLSL type (ex. "vec4") */
    addUniform(name) {
        this.uniformLocs[name] = gl.getUniformLocation(this.programID, name);
    }
    
    updateUniform(name, value) {
        if (value.constructor.name == "Vector2") {
            this.updateUniformVector2(name, value);
        } else if (value.constructor.name == "Vector3") {
            this.updateUniformVector3(name, value);
        } else if (value.constructor.name == "Vector4") {
            this.updateUniformVector4(name, value);
        } else if (value.constructor.name == "Matrix2") {
            this.updateUniformMatrix2(name, value);
        } else if (value.constructor.name == "Matrix3") {
            this.updateUniformMatrix3(name, value);
        } else if (value.constructor.name == "Matrix4") {
            this.updateUniformMatrix4(name, value);
        } else {
            this.updateUniformValue(name, value);
        } 
    }

    updateUniformValue(name, value) {
        gl.uniform1f(this.uniformLocs[name], value);
    }
    
    updateUniformVector2(name, vec2) {
        gl.uniform2f(this.uniformLocs[name], vec2.x, vec2.y);
    }
    
    updateUniformVector3(name, vec3) {
        gl.uniform3f(this.uniformLocs[name], vec3.x, vec3.y, vec3.z);
    }
    
    updateUniformVector4(name, vec4) {
        gl.uniform4f(this.uniformLocs[name], vec4.x, vec4.y, vec4.z, vec4.w);
    }
    
    updateUniformMatrix2(name, mat2) {
        gl.uniform2fv(this.uniformLocs[name], false, mat2.toArray());
    }
    
    updateUniformMatrix3(name, mat3) {
        gl.uniform3fv(this.uniformLocs[name], false, mat3.toArray());
    }
    
    updateUniformMatrix4(name, mat4) {
        gl.uniform4fv(this.uniformLocs[name], false, mat4.toArray());
    }
}