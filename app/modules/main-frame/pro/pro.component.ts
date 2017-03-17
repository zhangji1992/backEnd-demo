/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'pro',
    template: `
        <router-outlet></router-outlet>
    `
})
export class ProComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

}