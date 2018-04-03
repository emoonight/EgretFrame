//keyof 索引类型查询操作符

//example1
interface IBb
{
    id:number;
    attri:number;
    desc:string;
}

type bb = keyof IBb;

//exmaple2
class clsAA<T>
{
    [index:string]:T;
}

let ak:keyof clsAA<number>;
let av:keyof clsAA<number>["bbb"];


//交叉类型
function merge<T,U>(a:T,b:U):T & U
{
    let retVal = <T & U>{};

    for(let k in a)
        retVal[k] = <any>a[k];

    for(let o in b)
        retVal[o] = <any>b[o];

    return retVal;
}


//选取类型

interface IPerson
{
    id:number;
    name:string;
    age:number;
}

let person:IPerson = {id:1,name:"messi",age:15}

declare function pick<T,K extends keyof T>(obj:T,...keys:K[]):Pick<T,K>;

let pickNameAndAge = pick(person,"name","age");


//可辨识联合类型
interface IAA{id:1;name:string;}
interface IBB{id:2,age:number;}
interface ICC{id:3,sex:string;}

type DD = IAA | IBB | ICC

function getDD(dd:DD)
{
    switch(dd.id)
    {
        case 1: 
                //do sth
            break;
        case 2:
        case 3:
            break;
    }
}