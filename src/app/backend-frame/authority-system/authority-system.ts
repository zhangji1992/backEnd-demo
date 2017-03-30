/**
 * Created by zhangJi on 2017/3/30.
 */
import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../providers/request.service";

@Component({
  selector: 'authority-system',
  templateUrl: './authority-system.html',
  styleUrls: ['./authority-system.scss'],
  providers: [RequestService]
})
export class AuthoritySystemComponent implements OnInit {

  constructor(public service: RequestService) { }

  ngOnInit() {
  }

  test(){
    let url = 'http://mam.mindmedia.cn:8181/a/topMenu.do';
    this.service.getTopMenu(url);
  }
}
