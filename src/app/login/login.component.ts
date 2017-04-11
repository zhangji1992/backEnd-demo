/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RequestService} from "../providers/request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[ConfirmationService,CookieService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  autoLogin: false;
  autoLoginChecked: boolean = false;
  errorMsg:string='';

  constructor(private fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              public service: RequestService,
              private confirmationService:ConfirmationService,
              private _cookieService:CookieService) {
  }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.loginForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', Validators.required],
      'result':[]
      // 'forgetPass': [this.autoLoginChecked]
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = ''; //相当于重置错误信息
      const control = form.get(field); //获取表单中对应字段的组件
      if (control && control.dirty && !control.valid) { //当组件不正确的时候，获取值被改变的时候
        this.submitted = true;
        const messages = this.validationMessages[field];
        console.log(control.errors);
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'username': '',
    'password': '',
    'result':'',
  };

  validationMessages = {
    'username': {
      'required': '请填写用户名',
    },
    'password': {
      'required': '请填写用户密码',
    },
    'result':{

    }
  };

  onSubmit(value: string): void {

    let param = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    console.log('param', param);
    this.service.login(param).then(res => {
      this._cookieService.put('userName', res.name);
      console.log('vvv2', this.service.userName);
      // this.router.navigate(['../backend-frame', 'demo', 'demo-page'], { relativeTo: this.route });
      this.router.navigateByUrl('/backend-frame/authority-system/user-manage');
    },error=>this.alertDialog(error)).catch(error=>this.alertDialog(error));
    // this.service.login('http://mam.mindmedia.cn:8181/loginForm.do', param)
    //   .subscribe(
    //     data => console.log('loginCtrl'),
    //     error => console.log('loginCtrlError')
    //   );

    // this.heroService.create(name)
    //   .subscribe(
    //     hero  => this.heroes.push(hero),
    //     error =>  this.errorMessage = <any>error);

    // http://mam.mindmedia.cn:8181/a/menuTree.json

    // this.service.login();

    // this.loginService.login('http://mam.mindmedia.cn:8181/loginForm.do', {username: this.loginForm.value.userName, password: this.loginForm.value.password});
    // this.router.navigate(['backend-frame', 'QR-code-manage', 'overview']);
    // this.router.navigateByUrl("/backend-frame/QR-code-manage/overview");
  }

  alertDialog(error:any){
    this.formErrors.result='登录错误：'+error;
   /* this.confirmationService.confirm({
      message: error.errorMassage,
    });*/
  }

}
