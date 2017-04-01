import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../providers/request.service";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  selectedMenu: string;
  topMenu: any[];

  constructor(private service: RequestService) { }

  ngOnInit() {
    let url = 'http://mam.mindmedia.cn:8181/a/topMenu.do';
    this.service.getTopMenu(url)
      .then(topMenu => {
        // console.log('ngOnInit getTopMenu', topMenu);
        this.topMenu = topMenu;
      });
  }

  clickMenu(index: string){
    this.selectedMenu = index;
    console.log('select TopMenu', this.selectedMenu);
  }
}
