/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, animate, state, style, transition, trigger} from '@angular/core';

@Component({
    selector: 'QR-code-frame',
    templateUrl: './QR-code-manage.component.html',
    styleUrls: ['./QR-code-manage.component.scss'],
    animations: [trigger( 'openClose', [
      state('collapsed, void', style({height: '0px', color: 'maroon', borderColor: 'maroon',overflow:'hidden'})),
      state('expanded', style({height: '*', borderColor: 'green', color: 'green'})),
      transition(
        'expanded <=> collapsed', [animate("150ms ease-in", style({height: '*'})), animate(150)])
    ])]
})
export class QRCodeManageComponent{
  selectedItem: number=1;
  selectedChildItem: number=null;
  stateExpression: string;
  menuData:any[]=[{
    id:1,label:'首页',icon:'',expression:'collapsed',path:'overview',children:[]
  },{
    id:2,label:'产品管理',icon:'',expression:'collapsed',path:'',
    children:[
      {id:21,label:'添加产品',icon:'',expression:'collapsed',path:'',},
      {id:22,label:'产品列表',icon:'',expression:'collapsed',path:'product-manage'}
    ]
  },{
    id:3,label:'计划单管理',icon:'',expression:'collapsed',path:'',
    children:[
      {id:31,label:'添加计划单',icon:'',expression:'collapsed',path:'',},
      {id:32,label:'计划单列表',icon:'',expression:'collapsed',path:'plan-order'}
    ]
  },{
    id:4,label:'铺货管理',icon:'',expression:'collapsed',path:'distribution-manage',children:[]
  },{
    id:5,label:'运营中心',icon:'',expression:'collapsed',path:'operation-center',children:[]
  },{
    id:6,label:'数据统计',icon:'',expression:'collapsed',path:'',
    children:[
      {id:61,label:'产品统计',icon:'',expression:'collapsed',path:'data-statistics'},
      {id:62,label:'扫码统计',icon:'',expression:'collapsed',path:'data-statistics'},
      {id:63,label:'中奖统计',icon:'',expression:'collapsed',path:'data-statistics'}
    ]
  },{
    id:7,label:'溯源管理',icon:'',expression:'collapsed',path:'',
    children:[
      {id:71,label:'垛码列表',icon:'',expression:'collapsed',path:'traceability-manage'},
      {id:72,label:'箱码列表',icon:'',expression:'collapsed',path:'traceability-manage'},
      {id:73,label:'盒码列表',icon:'',expression:'collapsed',path:'traceability-manage'},
    ]
  },{
    id:8,label:'异常查询',icon:'',expression:'collapsed',path:'',
    children:[
      {id:81,label:'异地扫码',icon:'',expression:'collapsed',path:'exception-query'},
      {id:82,label:'异常二维码',icon:'',expression:'collapsed',path:'exception-query'}
    ]
  } ];

  constructor() {}
  ngOnInit() {

  }

  clickItem(menu:any){
    this.selectedItem=menu.id;
    for(let m of this.menuData){
       m.expression='collapsed';
    }
    menu.expression === 'collapsed' ?  menu.expression='expanded' :  menu.expression='collapsed';
  }

  clickChildItem(id:number){
    console.log(id);
    this.selectedChildItem=id;
  }
}
