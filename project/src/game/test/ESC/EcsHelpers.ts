module ecs
{
    export class EcsHelpers
    {
        public static getPowerOfTwoSize(n:number):number
        {   
            if(n<2) return 2;
            n--;
            n = n | (n>>1);
            n = n | (n>>2);
            n = n | (n>>4);
            n = n | (n>>8);
            n = n | (n>>16);
            return n+1;
        }

        public static ComponentsCount:number=0;
    }
}