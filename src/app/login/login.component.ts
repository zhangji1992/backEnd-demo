/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public login(): void {
    this.router.navigate(['backend-frame', 'QR-code-manage', 'overview']);
    // this.router.navigateByUrl("/backend-frame/QR-code-manage/overview");
  }

}
