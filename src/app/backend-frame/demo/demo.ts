/**
 * Created by zhangJi on 2017/3/30.
 */
import {Component, OnInit, animate, state, style, transition, trigger} from '@angular/core';
import {RequestService} from "../../providers/request.service";

@Component({
  selector: 'demo',
  templateUrl: './demo.html',
  styleUrls: ['./demo.scss'],
  animations: [trigger('toggle', [
    state('closed, void', style({height: '0px', color: 'maroon', borderColor: 'maroon', overflow: 'hidden'})),
    state('open', style({height: '*', borderColor: 'green', color: 'green'})),
    transition(
      'open <=> closed', [animate("150ms ease-in", style({height: '*'})), animate(150)])
  ])]
})
export class DemoComponent implements OnInit {
  selectedItem: string;
  selectedChildItem: string;
  stateExpression: string;
  leftMenu: any[];
  // leftMenu: any[] = [
  //   {
  //     id: 1,
  //     label: '首页',
  //     icon: '',
  //     expression: 'closed',
  //     path: 'overview',
  //     children: []
  //   }, {
  //     id: 2,
  //     label: '产品管理',
  //     icon: '',
  //     expression: 'closed',
  //     path: '',
  //     children: [
  //       {
  //         id: 21,
  //         label: '添加产品',
  //         icon: '',
  //         expression: 'closed',
  //         path: ''
  //       },
  //       {
  //         id: 22,
  //         label: '产品列表', icon: '', expression: 'closed', path: 'product-manage'
  //       }
  //     ]
  //   }, {
  //     id: 3, label: '计划单管理', icon: '', expression: 'closed', path: '',
  //     children: [
  //       {id: 31, label: '添加计划单', icon: '', expression: 'closed', path: '',},
  //       {id: 32, label: '计划单列表', icon: '', expression: 'closed', path: 'plan-order'}
  //     ]
  //   }, {
  //     id: 4, label: '铺货管理', icon: '', expression: 'closed', path: 'distribution-manage', children: []
  //   }, {
  //     id: 5, label: '运营中心', icon: '', expression: 'closed', path: 'operation-center', children: []
  //   }, {
  //     id: 6, label: '数据统计', icon: '', expression: 'closed', path: '',
  //     children: [
  //       {id: 61, label: '产品统计', icon: '', expression: 'closed', path: 'data-statistics'},
  //       {id: 62, label: '扫码统计', icon: '', expression: 'closed', path: 'data-statistics'},
  //       {id: 63, label: '中奖统计', icon: '', expression: 'closed', path: 'data-statistics'}
  //     ]
  //   }, {
  //     id: 7, label: '溯源管理', icon: '', expression: 'closed', path: '',
  //     children: [
  //       {id: 71, label: '垛码列表', icon: '', expression: 'closed', path: 'traceability-manage'},
  //       {id: 72, label: '箱码列表', icon: '', expression: 'closed', path: 'traceability-manage'},
  //       {id: 73, label: '盒码列表', icon: '', expression: 'closed', path: 'traceability-manage'},
  //     ]
  //   }, {
  //     id: 8, label: '异常查询', icon: '', expression: 'closed', path: '',
  //     children: [
  //       {id: 81, label: '异地扫码', icon: '', expression: 'closed', path: 'exception-query'},
  //       {id: 82, label: '异常二维码', icon: '', expression: 'closed', path: 'exception-query'}
  //     ]
  //   }];

  constructor(private service: RequestService) {
  }

  ngOnInit() {
    let url = 'http://mam.mindmedia.cn:8181/a/menuTree.do';
    let param = {         //请求topMenu第二项对应的leftMenu
      id: 2
    };
    this.service.getLeftMenu(url, param)
      .then(leftMenu => this.leftMenu = leftMenu);
  }

  clickItem(menu: any) {
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
