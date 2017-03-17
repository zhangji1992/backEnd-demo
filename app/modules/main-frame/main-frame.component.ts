/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';
import {MainFrameData} from "./main-frame-data";


@Component({
    selector: 'main-frame',
    templateUrl: 'app/modules/main-frame/main-frame.component.html',
    styleUrls: ['app/modules/main-frame/main-frame.component.css']
})
export class MainFrameComponent implements OnInit {
    title = '奇十正一后台管理平台';
    menuList = MainFrameData.menuList;
    selectedItem: number = null;

    constructor() {
    }

    ngOnInit() {
    }

    select(index: number) {
        this.selectedItem = index;
    }
}