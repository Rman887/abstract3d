goog.provide("engine3D.Matrix")
goog.provide("engine3D.Matrix2");

goog.require("engine3D.Vector3");
goog.provide("engine3D.Matrix3");
goog.require("engine3D.Vector4");
goog.provide("engine3D.Matrix4");

class Matrix {
    
    constructor(r, c) {
        this.rows = r;
        this.cols = c;
        this.m = [];
        for (var i = 0; i < this.rows; i++) {
            this.m[i] = [];
            for (j = 0; j < this.cols; j++)
                this.m[i][j] = 0;
        }
    }
    
    /** Sets to identity matrix. */
    setIdentity() {
        this.setZero();
        for (var i = 0; i < this.rows; i++)
            this.m[(this.cols+1)*i] = 1;
        return this;
    }
    
    /** Sets to all zeroes. */
    setZero() {
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] = 0;
        return this;
    }
    
    /** Sets to all ones. */
    setOne() {
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] = 1;
        return this;
    }
    
    /** Transpose matrix. */
    transpose() {
        for (var i = 0; i < this.rows / 2; i++) for (var j = 0; j < this.cols/2; j++) {
            var t = this.m[i][j];
            this.m[i][j] = this.m[j][i];
            this.m[j][i] = t;
        }
        return this;
    }
    
    /** Makes a copy. */
    copy() {
        var mat = new Matrix(this.rows, this.cols);
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            mat.m[i][j] = this.m[i][j];
        return mat;
    }
    
    /** Sets to a 1D array. */
    set1D(a) {
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] = a[this.cols*i + j];
        return this;
    }
    
    /** Sets to a 2D array. */
    set2D(a) {
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] = a[i][j];
        return this;
    }
    
    /** Sets to another matrix. */
    set(mat) {
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][i] = mat.m[i][j];
        return this;
    }
    
    toString() {
        var s = "{";
        for (var i = 0; i < this.rows; i++) {
            s += "{" + this.m[i][0];
            for (var j = 1; j < this.cols; j++)
                s += "," + this.m[i][j];
            s += "},"
        }
        return s.subtring(0, s.length - 1) + "}";
    }
    
    /** Matrix addition. */
    add(mat) {
        if (this.rows != mat.rows || this.cols != mat.cols) return null;
        
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] += mat.m[i][j];
        return this;
    }
    
    /** Matrix subtraction. */
    sub(mat) {
        if (this.rows != mat.rows || this.cols != mat.cols) return null;
        
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] -= mat.m[i][j];
        return this;
    }
    
    /** Scaling by a constant. */
    scl(c) {
        for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)
            this.m[i][j] *= c;
        return this;
    }
    
    /** Matrix multiplication. */
    mult(mat) {
        if (this.cols != mat.rows) return null;
        
        var a = [];
        for (var i = 0; i < this.rows; i++) {
            a[i] = [];
            for (var j = 0; j < mat.cols; j++) {
                a[i][j] = 0;
                for (var k = 0; k < this.cols; k++)
                    a[i][j] += this.m[i][k] * mat.m[k][j];
            }
        }
        this.set2D(a);
        return this;
    }
    
    /** Determinant. */
    det() {
        if (this.rows != this.cols) return null;
        return _det(this.rows);
    }
    
    /** Helper method for det(). */
    _det(r) {
        if (r == 2)
            return this.m[0][0] * this.m[1][1] - this.m[0][1] * this.m[1][0];
        
        var d = 0;
        for (var i = 0; i < r; i++) {
            if (i % 2 == 0) d += this.m[r - 1][i] * det(r - 1);
            else            d -= this.m[r - 1][i] * det(r - 1);
        }
        return d;
    }
}


class Matrix2 extends Matrix {
    
    constructor() {
        super(2, 2);
    }
    
    /** Converts to a rotation matrix. */
    setRotation(theta) {
        this.m = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
        return this;
    }
    
    /** Converts to a scale transformation matrix. */
    setScale(xScale, yScale) {
        this.m = [[xScale, 0], [0, yScale]];
        return this;
    }
    
    toArray() {
        var a = new Float32Array(4);
        a[0] = this.m[0][0];
        a[1] = this.m[0][1];
        a[2] = this.m[1][0];
        a[3] = this.m[1][1];
        return a;
    }
}

class Matrix3 extends Matrix {
    
    constructor() {
        super(3, 3);
    }
    
    toArray() {
        var a = new Float32Array(4);
        a[0] = this.m[0][0];
        a[1] = this.m[0][1];
        a[2] = this.m[0][2];
        a[3] = this.m[1][0];
        a[4] = this.m[1][1];
        a[5] = this.m[1][2];
        a[6] = this.m[2][0];
        a[7] = this.m[2][1];
        a[8] = this.m[2][2];
        return a;
    }
}

class Matrix4 extends Matrix {
    
    constructor() {
        super(4, 4);
    }
    
    toArray() {
        var a = new Float32Array(4);
        a[0] = this.m[0][0];
        a[1] = this.m[0][1];
        a[2] = this.m[0][2];
        a[3] = this.m[0][3];
        a[4] = this.m[1][0];
        a[5] = this.m[1][1];
        a[6] = this.m[1][2];
        a[7] = this.m[1][3];
        a[8] = this.m[2][0];
        a[9] = this.m[2][1];
        a[10] = this.m[2][2];
        a[11] = this.m[2][3];
        a[12] = this.m[3][0];
        a[13] = this.m[3][1];
        a[14] = this.m[3][2];
        a[15] = this.m[3][3];
        return a;
    }
}