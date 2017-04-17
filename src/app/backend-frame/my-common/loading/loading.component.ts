import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnChanges  {
  @Input('displayLoading') displayload: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if('displayload' == propName){
        let chng = changes[propName];
        this.displayload=chng.currentValue;
        // console.log(chng.previousValue);
      }
    }
    console.log(this.displayload);
  }
}
