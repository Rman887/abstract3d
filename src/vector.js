goog.require("engine3D.Matrix");
goog.provide("engine3D.Vector");

goog.provide("engine3D.Vector2");
goog.provide("engine3D.Vector3");
goog.provide("engine3D.Vector4");

/**
Classes that represent 2D, 3D, and 4D vectors.
Note that all operations that return a vector are also self-modifying.
*/

class Vector {
    
    constructor(size) {
        this.size = size;
        this.v = new Array(size);
        this.setZero();
    }
    
    /** Sets this vector to the zero vector. */
    setZero() {
        for (var i = 0; i < this.size; i++)
            this.v[i] = 0;
        return this;
    }
    
    /** Sets the components of this vector to another's. */
    set(vec) {
        for (var i = 0; i < this.size; i++)
            this.v[i] = vec[i];
        return this;
    }
    
    /** Make a copy. */
    copy() {
        var v = new Vector(this.size);
        for (var i = 0; i < this.size; i++)
            v.v[i] = this.v[i];
        return v;
    }
    
    toString() {
        var s = "(" + this.v[0];
        for (var i = 1; i < this.size; i++)
            s += "," + this.v[i];
        return s;
    }
    
    /** Vector addition. */
    add(vec) {
        if (this.size != vec.size) return null;
        
        for (var i = 0; i < this.size; i++)
            this.v[i] += vec[i];
        return this;
    }
    
    /** Vector subtraction. */
    sub(vec) {
        if (this.size != vec.size) return null;
        
        for (var i = 0; i < this.size; i++)
            this.v[i] -= vec[i];
        return this;
    }
    
    /** Scalar multiplication. */
    scl(c) {
        for (var i = 0; i < this.size; i++)
            this.v[i] *= c;
        return this;
    }
    
    /** Negation (scl(-1)). */
    neg() {
        return scl(-1);
    }
    
    /** Dot product. */
    dot(vec) {
        if (this.size != vec.size) return NaN;
        
        var d = 0;
        for (var i = 0; i < this.size; i++)
            d += this.v[i] * vec.v[i];
        return this;
    }
    
    /** Angle to another vector. */
    angle(vec) {
        return Math.acos(this.dot(vec) / this.mag() / vec.mag());
    }
    
    /** Component of this vector onto another. */
    comp(vec) {
        return this.dot(v) / vec.mag();
    }
    
    /** Vector projection onto another. */
    proj(vec) {
        return this.scl(this.dot(vec) / vec.magSqr());
    }
    
    /** Distance squared. */
    distSqr(vec) {
        if (this.size != vec.size) return NaN;
        
        var d = 0;
        for (var i = 0; i < this.size; i++)
            d += (vec.v[i]-this.v[i]) * (vec.v[i]-this.v[i])
        return d;
    }
    
    /** Distance. */
    dist(vec) {
        return Math.sqrt(this.distSqr(vec));
    }
    
    /** Magnitude squared. */
    magSqr() {
        return this.dot(x);
    }
    
    /** Magnitude. */
    mag() {
        return Math.sqrt(this.magSqr());
    }
    
    /** Normalization. */
    normalize() {
        this.scl(this.mag());
        return this;
    }
    
    /** Linear interpolation. 0 < t < 1. */
    lerp(vec, t) {
        if (this.size != vec.size) return null;
        
        for (var i = 0; i < this.size; i++)
            this.v[i] += (vec.v[i] - this.v[i]) * t;
        return this;
    }
    
    /** Matrix (linear) transformation. */
    applyTransform(mat) {
        if (this.size != mat.cols) return null;
        
        var vec = this.copy();
        for (var i = 0; i < mat.rows; i++) for (var j = 0; j < this.size; j++)
            this.v[i] += mat.m[i][j] * this.v[j];
        
        this.size = mat.rows;
        return this;
    }
}

class Vector2 {
    
    constructor(x, y) {
        super(2);
        this.v[0] = x || 0;
        this.v[1] = y || 0;
    }
    
    get x() {
        return this.v[0];
    }
    
    get y() {
        return this.v[1];
    }
    
    set x(newX) {
        this.v[0] = newX;
    }
    
    set y(newY) {
        this.v[1] = newY;
    }

    /** Applies a 2x2 matrix transformation to this vector. */
    applyTransform(mat) {
        var x0 = this.x; var y0 = this.y;
        this.x = mat.m[0] * x0 + mat.m[1] * y0;
        this.y = mat.m[2] * x0 + mat.m[3] * y0;
        return this;
    }
    
    /** Creates a 3d vector with z=0. */
    toVector3() {
        return new Vector3(this.x, this.y);
    }
    
    /** Creates a 4d vector with z=0 and w=1. */
    toVector4() {
        return new Vector4(this.x, this.y);
    }
}

class Vector3 extends Vector {
    
    constructor(x, y, z) {
        super(3);
        this.v[0] = x || 0;
        this.v[1] = y || 0;
        this.v[2] = z || 0;
    }
    
    get x() {
        return this.v[0];
    }
    
    get y() {
        return this.v[1];
    }
    
    get z() {
        return this.v[2];
    }
    
    set x(newX) {
        this.v[0] = newX;
    }
    
    set y(newY) {
        this.v[1] = newY;
    }
    
    set z(newZ) {
        this.v[2] = newZ;
    }
    
    /** Cross product with another vector. */
    cross(v) { 
        var x0 = this.x; var y0 = this.y; var z0 = this.z;
        this.x = y0 * v.z - z0 * v.y;
        this.y = z0 * v.x - x0 * v.z;
        this.z = x0 * v.y - y0 * v.x;
        return this;
    }
    
    /** Creates a 2d vector with the same x and y components. */
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    
    /** Creates a 4d vector with w=1. */
    toVector4() {
        return new Vector4(this.x, this.y, this.z);
    }
}

class Vector4 extends Vector {
    
    constructor(x, y, z, w) {
        super(4);
        this.v[0] = x || 0;
        this.v[1] = y || 0;
        this.v[2] = z || 0;
        this.v[3] = w || 1;
    }
    
    get x() {
        return this.v[0];
    }
    
    get y() {
        return this.v[1];
    }
    
    get z() {
        return this.v[2];
    }
    
    get w() {
        return this.v[3];
    }
    
    set x(newX) {
        this.v[0] = newX;
    }
    
    set y(newY) {
        this.v[1] = newY;
    }
    
    set z(newZ) {
        this.v[2] = newZ;
    }
    
    set w(newW) {
        this.v[3] = newW;
    }
    
    /** Creates a 2d vector with the same x and y components. */
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    
    /** Creates a 3d vector with the same x, y, and z components. */
    toVector3() {
        return new Vector3(this.x, this.y, this.z);
    }
}