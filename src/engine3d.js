goog.require("engine.Engine");
goog.provide("engine3d.Engine3D");

class Engine3D {
	constructor(canvas) {
		this.canvas = canvas;
        initGL();
        
	}
    
    initGL() {
        try {
            window.gl = this.canvas.getContext("webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
            
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
        } catch (e) {}
    }
    
    clear() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}
