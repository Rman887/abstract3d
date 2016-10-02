goog.provide("engine3D.Vector2");
goog.provide("engine3D.Vector3");
goog.provide("engine3D.Vector4");

class Vector2 {
    
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    
    /** Sets this vector's components to another one's. */
    set(v) {
        this.x = v.x;
        this.y = v.y;
    }
    
    /** Adds another vector to this one. */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    
    /** Subtracts another vector from this one. */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    
    /** Negates this vector (same as scale(-1)). */
    neg() {
        return scale(-1);
    }
    
    /** Scales this vector by a constant. */
    scale(c) {
        this.x *= c;
        this.y *= c;
        return this;
    }
    
    /** Dot product with another vector. */
    dot(v) {
        return this.x*v.x + this.y*v.y;
    }
    
    /** Distance squared to another vector. */
    distSqr(v) {
        return (v.x-this.x)*(v.x-this.x) + (v.y-this.y)*(v.y-this.y);
    }
    
    /** Distance to another vector. */
    dist(v) {
        return Math.sqrt(this.distSqr(v));
    }
    
    /** The magnitude squared of this vector. */
    magSqr() {
        return this.dot(x);
    }
    
    /** The magnitude of this vector. */
    mag() {
        return Math.sqrt(this.magSqr());
    }
    
    /** Normalizes this vector to length 1. */
    normalize() {
        this.scale(this.mag());
        return this;
    }
    
    /** Linearly interpolates between between this vector and another. 0 < t < 1. */
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }
    
    /** Creates a copy of this vector with the same components. */
    copy() {
        return new Vector2(this.x, this.y);
    }
    
    /** Creates a 3d vector with z=0. */
    toVector3() {
        return new Vector3(this.x, this.y);
    }
    
    /** Creates a 4d vector with z=0 and w=1. */
    toVector4() {
        return new Vector4(this.x, this.y);
    }
    
    toString() {
        return "(" + this.x + "," + this.y + ")";
    }
}

class Vector3 {
    
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    
    /** Sets this vector's components to another one's. */
    set(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
    
    /** Adds another vector to this one. */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    
    /** Subtracts another vector from this one. */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    
    /** Negates this vector (same as scale(-1)). */
    neg() {
        return scale(-1);
    }
    
    /** Scales this vector by a constant. */
    scale(c) {
        this.x *= c;
        this.y *= c;
        this.z *= c;
        return this;
    }
    
    /** Dot product with another vector. */
    dot(v) {
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }
    
    /** Cross product with another vector. */
    cross(v) { 
        var x0 = this.x; var y0 = this.y; var z0 = this.z;
        this.x = y0 * v.z - z0 * v.y;
        this.y = z0 * v.x - x0 * v.z;
        this.z = x0 * v.y - y0 * v.x;
        return this;
    }
    
    /** Distance squared to another vector. */
    distSqr(v) {
        return (v.x-this.x)*(v.x-this.x) + (v.y-this.y)*(v.y-this.y) + (v.z-this.z)*(v.z-this.z);
    }
    
    /** Distance to another vector. */
    dist(v) {
        return Math.sqrt(this.distSqr(v));
    }
    
    /** The magnitude squared of this vector. */
    magSqr() {
        return this.x*this.x + this.y*this.y + this.z*this.z;
    }
    
    /** The magnitude of this vector. */
    mag() {
        return Math.sqrt(this.magSqr());
    }
    
    /** Normalizes this vector to length 1. */
    normalize() {
        this.scale(this.mag());
        return this;
    }
    
    /** Linearly interpolates between between this vector and another. 0 < t < 1. */
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        return this;
    }
    
    /** Creates a 2d vector with the same x and y components. */
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    
    /** Creates a copy of this vector with the same components. */
    copy() {
        return new Vector3(this.x, this.y, this.z);
    }
    
    /** Creates a 4d vector with w=1. */
    toVector4() {
        return new Vector4(this.x, this.y, this.z);
    }
    
    toString() {
        return "(" + this.x + "," + this.y + "," + this.z + ")";
    }
}

class Vector4 {
    
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 1;
    }
    
    /** Sets this vector's components to another one's. */
    set(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;
    }
    
    /** Adds another vector to this one. */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }
    
    /** Subtracts another vector from this one. */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }
    
    /** Negates this vector (same as scale(-1)). */
    neg() {
        return scale(-1);
    }
    
    /** Scales this vector by a constant. */
    scale(c) {
        this.x *= c;
        this.y *= c;
        this.z *= c;
        this.w *= c;
        return this;
    }
    
    /** Dot product with another vector. */
    dot(v) {
        return this.x*v.x + this.y*v.y + this.z*v.z + this.w*v.w;
    }
    
    /** Distance squared to another vector. */
    distSqr(v) {
        return (v.x-this.x)*(v.x-this.x) + (v.y-this.y)*(v.y-this.y) + (v.z-this.z)*(v.z-this.z);
    }
    
    /** Distance to another vector. */
    dist(v) {
        return Math.sqrt(this.distSqr(v));
    }
    
    /** The magnitude squared of this vector. */
    magSqr() {
        return this.x*this.x + this.y*this.y + this.z*this.z;
    }
    
    /** The magnitude of this vector. */
    mag() {
        return Math.sqrt(this.magSqr());
    }
    
    /** Normalizes this vector to length 1. */
    normalize() {
        this.scale(this.mag());
        return this;
    }
    
    /** Linearly interpolates between between this vector and another. 0 < t < 1. */
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        this.w += (v.w - this.w) * t;
        return this;
    }
    
    /** Creates a 2d vector with the same x and y components. */
    toVector2() {
        return new Vector2(this.x, this.y);
    }
    
    /** Creates a 3d vector with the same x, y, and z components. */
    toVector3() {
        return new Vector3(this.x, this.y, this.z);
    }
    
    /** Creates a copy of this vector with the same components. */
    copy() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
    
    toString() {
        return "(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")";
    }
}