import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {ConfirmationService} from "primeng/primeng";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  selectedMenu: string;
  topMenu: any[];

  constructor(public service: RequestService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.service.getTopMenu()
      .then(topMenu => {
        console.log('ngOnInit getTopMenu', topMenu);
        this.topMenu = topMenu;
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
        let url = "http://mam.mindmedia.cn:8181/a/logout.do";
        this.service.logout(url)
          .then(() => {});
      }
    });


  }
}
