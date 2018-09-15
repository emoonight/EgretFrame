var glMatrix;
(function (glMatrix) {
    /**
     * Common utilities
     * @module glMatrix
     */
    // Configuration Constants
    glMatrix.EPSILON = 0.000001;
    glMatrix.ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
    glMatrix.RANDOM = Math.random;
    /**
     * Sets the type of array used when creating new vectors and matrices
     *
     * @param {Type} type Array type, such as Float32Array or Array
     */
    function setMatrixArrayType(type) {
        glMatrix.ARRAY_TYPE = type;
    }
    glMatrix.setMatrixArrayType = setMatrixArrayType;
    var degree = Math.PI / 180;
    /**
     * Convert Degree To Radian
     *
     * @param {Number} a Angle in Degrees
     */
    function toRadian(a) {
        return a * degree;
    }
    glMatrix.toRadian = toRadian;
    /**
     * Tests whether or not the arguments have approximately the same value, within an absolute
     * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
     * than or equal to 1.0, and a relative tolerance is used for larger values)
     *
     * @param {Number} a The first number to test.
     * @param {Number} b The second number to test.
     * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
     */
    function equals(a, b) {
        return Math.abs(a - b) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
    }
    glMatrix.equals = equals;
})(glMatrix || (glMatrix = {}));
//# sourceMappingURL=glMatrix.js.map