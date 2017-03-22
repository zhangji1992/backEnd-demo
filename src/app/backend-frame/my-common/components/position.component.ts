/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'nav-position',
    template: `
        <div>
            <span>当前位置：</span>
            <span *ngFor="let item of items;let i = index"><label>{{item}}</label><label *ngIf="i != items.length-1">-></label></span>
        </div>
    `,
    inputs: ['items']
})
export class PositionComponent implements OnInit {
    //@Input items: any[];
    constructor() {
    }

    ngOnInit() {
    }

}