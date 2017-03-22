/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component} from '@angular/core';

@Component({
    selector: 'QR-code-frame',
    templateUrl: './QR-code-manage.component.html',
    styleUrls: ['./QR-code-manage.component.scss']
})
export class QRCodeManageComponent{
  selectedItem: number = null;
  constructor() { }

  ngOnInit() {
  }

  clickItem(index: number){
    this.selectedItem = index;
  }
}
