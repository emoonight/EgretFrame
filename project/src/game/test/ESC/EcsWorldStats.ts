module ecs
{
    export class EcsWorldStats
    {
        ActiveEntities:number
        ReservedEntities:number
        Filters:number
        Components:number    

        constructor($active:number,$reserved:number,$filters:number,$components:number)
        {
            this.ActiveEntities = $active;
            this.ReservedEntities  = $reserved ;
            this.Filters = $filters;
            this.Components =$components;
        }
    }
}