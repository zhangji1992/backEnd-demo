import {Injectable} from '@angular/core';
import {PlanData,AddPlanData} from "./planData";
@Injectable()
export class planService{
    planData=[];
    selectAllOrign=[];
    getPlanData(): Promise < PlanData[] > {
        this.planData=[{
            id: 1,
            selected:false,
            checked:'aaa',
            planInfo:'产品名称',
            qrcodeInfo:'丽鹏股份',
            createTime: '2015-03-11',
            endTime:'2015-03-11',
            status:1,
        },{
            id: 2,selected:false,
            checked:'bbb',
            planInfo:'产品名称2',
            qrcodeInfo:'丽鹏股份',
            createTime: '2015-03-11',
            endTime:'2015-03-11',
            status:1,
        }];
        return Promise.resolve(this.planData);
    };
    getSelectAllOrign(){
        for(let plan of this.planData){
            this.selectAllOrign.push(plan.id);
        }
        return this.selectAllOrign;
    };
    setPlanData(){

    };
    addPlanData(planData:AddPlanData){

    };
    editPlanData(editData:AddPlanData){

    };
}
