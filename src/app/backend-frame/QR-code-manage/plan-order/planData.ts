export  class  PlanData{
    id: number;
    selected:boolean;
    checked:string;
    planInfo:string;
    qrcodeInfo:string;
    createTime: string;
    endTime:string;
    status:number;
}

export class AddPlanData{
  constructor(public printedName:string,public plan_product:string,public proname: string,public  producer:string,public pnumber:number,public deadline:string,public id?: number,public hetong?:string,public desc?:string){}
}
