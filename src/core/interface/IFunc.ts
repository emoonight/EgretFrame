//函数类型性接口
interface IFunc
{
    (ob:Observer,content:any);
}

class FuncTest 
{
    //限制函数的实现
    private f:IFunc = function(ob:Observer,content:any){}
}


//复合类型接口，感觉这个用处不大
interface Counter
{
    (index:number);
    
    update();
}


function getCounter():Counter
{
    let c = <Counter>function(index:number){};
    c.update=function(){}
    return c;
}

//接口继承类，并且只有 继承类的子类能实现接口
interface IClass extends egret.DisplayObject
{

}