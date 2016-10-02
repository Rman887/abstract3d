goog.require("engine.Engine");
goog.provide("engine3d.Engine3D");

class Engine3D {
    
    var gl;
    
	constructor(canvas) {
		this.canvas = canvas;
        initGL();
        initShaders();
        initBuffers();
        
	}
    
    initGL() {
        
    }
    
    initShaders() {
        
    }
    
    initBuffers() {
        
    }
}
