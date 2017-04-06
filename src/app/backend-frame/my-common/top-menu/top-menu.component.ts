import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {ConfirmationService} from "primeng/primeng";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  providers: [RequestService],
})
export class TopMenuComponent implements OnInit {
  selectedMenu: string;
  topMenu: any[];
  ifException: boolean = false;
  myException: string;
  @Input() userName: string;

  constructor(public service: RequestService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.service.getTopMenu()
      .then(topMenu => {
        console.log('ngOnInit getTopMenu', topMenu, this.service.userName);
        this.topMenu = topMenu;
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
      accept: () => {
        this.service.logout()
          .then(() => {});
      }
    });
  }
}
