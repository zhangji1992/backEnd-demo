import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {ConfirmationService} from "primeng/primeng";
import {CookieService} from "angular2-cookie/core";
import {Router} from "@angular/router";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  providers: [RequestService],
})
export class TopMenuComponent implements OnInit {
  selectedMenu: string;
  isExits:boolean=false;
  topMenu: any[];
  ifException: boolean = false;
  myException: string;
  userName: string = this._cookieService.get('userName');

  constructor(public router: Router,public service: RequestService,
              private confirmationService: ConfirmationService,private _cookieService:CookieService) {
  }

  ngOnInit() {
    console.log("dddd: ",JSON.stringify(this._cookieService.getAll()));

    this.service.getTopMenu()
      .then(topMenu => {
        console.log('ngOnInit getTopMenu', topMenu, this.service.userName);
        this.topMenu = topMenu;
      },error=>{
        if(error.resultStatus=='error' && error.errorMassage=='未登录或登录超时！'){
          this.router.navigateByUrl("/login");
        }else{
          /*this.confirmationService.confirm({
            header: '提示',
            message: error.errorMassage,
          });*/
        }
      })
      .catch(err => {
        this.ifException = true;
        this.myException = err;
      });
  }

  clickMenu(index: string) {
    this.selectedMenu = index;
    console.log('select TopMenu', this.selectedMenu);
  }

  logout() {
    this.confirmationService.confirm({
      header: '退出登录',
      message: '确定要退出登录吗？',
      key:'topmenuDialogKey',
      accept: () => {
        this.isExits=false;
        this.service.logout()
          .then(() => {
            this._cookieService.remove('userName');
          });
      },
      reject:() =>{
        this.isExits=false;
      }
    });
  }
}
