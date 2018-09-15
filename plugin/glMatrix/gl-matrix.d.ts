declare module glMatrix
{
    export function setMatrixArrayType(type); 
    export function toRadian(a);
    export function equals(a, b)
}

declare module mat4
{
    export function create();
    export function translate(out,a,v);
    export function perspective(out, fovy, aspect, near, far);
}

