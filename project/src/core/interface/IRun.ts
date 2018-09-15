interface IRun
{
    tickIndex:number;
    update?:(time:number)=>void;
}