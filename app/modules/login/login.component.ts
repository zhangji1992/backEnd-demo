/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: 'app/modules/login/login.component.html',
    styleUrls: ['app/modules/login/login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public login(): void {
        this.router.navigate(['main-frame']);
    }

}