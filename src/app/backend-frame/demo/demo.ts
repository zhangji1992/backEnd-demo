/**
 * Created by zhangJi on 2017/3/30.
 */
import {Component, OnInit, animate, state, style, transition, trigger} from '@angular/core';
import {RequestService} from "../../providers/request.service";
// import {ConfirmationService} from "primeng/primeng";

@Component({
  selector: 'demo',
  templateUrl: './demo.html',
  styleUrls: ['./demo.scss'],
  animations: [trigger('toggle', [
    state('closed, void', style({height: '0px', color: 'maroon', borderColor: 'maroon', overflow: 'hidden'})),
    state('open', style({height: '*', borderColor: 'green', color: 'green'})),
    transition('open <=> closed', [animate("150ms ease-in", style({height: '*'})), animate(150)])
  ])]
})
export class DemoComponent implements OnInit {
  selectedItem: string;
  selectedChildItem: string;
  stateExpression: string;
  leftMenu: any[];

  constructor(private service: RequestService) {
  }

  ngOnInit() {
    let param = {         //请求topMenu第二项对应的leftMenu
      id: 2
    };
    this.service.getLeftMenu(param)
      .then(leftMenu => {
          this.leftMenu = leftMenu;
          this.selectedItem = this.leftMenu[0].id;
          this.leftMenu[0].expression = 'open';
          this.selectedChildItem = this.leftMenu[0].children[0].id;
        },
        error => {
        });
  }

  clickItem(menu: any) {
    console.log('click in');
    this.selectedItem = menu.id;

    for (let m of this.leftMenu) {
      m.expression = 'closed';
    }
    menu.expression === 'closed' ? menu.expression = 'open' : menu.expression = 'closed';
  }

  clickChildItem(id: string) {
    console.log(id);
    this.selectedChildItem = id;
  }
}
