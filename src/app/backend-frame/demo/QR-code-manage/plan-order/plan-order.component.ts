import {Component, OnInit} from "@angular/core";
import {PlanData} from "./planData";
import {planService} from "./plan.service";

@Component({
  selector: 'plan-order',
  templateUrl: './plan-order.component.html',
  styleUrls: ['./plan-order.component.scss'],
  providers: [planService]
})
export class PlanOrderComponent implements OnInit {
  planData: PlanData[] = [];
  selectAllOrign: string[] = [];
  selectAll: string[] = [];
  checked: boolean = false;

  constructor(private planservice: planService) {
  }

  ngOnInit() {
    let _self = this;
    this.planservice.getPlanData().then(
      function (data) {
        _self.planData = data;
        _self.selectAllOrign = _self.planservice.getSelectAllOrign();
      }, function (error) {
        alert('error');
      }
    );
  }

  selectAllPlan(checked: boolean): void {
    if (checked) {
      this.selectAll = this.selectAllOrign;
    } else {
      this.selectAll = [];
    }
  }

}
