import {Component, OnInit} from "@angular/core";
import {planData} from "./planData";
import {planService} from "./plan.service";

@Component({
  selector: 'plan-order',
  templateUrl: './plan-order.component.html',
  styleUrls: ['./plan-order.component.scss'],
  providers:[planService]
})
export class PlanOrderComponent implements OnInit {
  constructor(private planservice:planService) {}
  planData:planData[]=[];
  selectAllOrign:string[] = [];
  selectAll:string[] = [];
  checked: boolean = false;
  ngOnInit() {
    let _self=this;
    this.planservice.getPlanData().then(
      function(data) {
        _self.planData=data;
        _self.selectAllOrign=_self.planservice.getSelectAllOrign();
      },function(error){
        alert('error');
      }
    );
  }

  selectAllPlan(checked:boolean):void{
    if(checked){
      this.selectAll=this.selectAllOrign;
    }else{
      this.selectAll=[];
    }
  }

}
