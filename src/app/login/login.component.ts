/**
 * Created by zhangJi on 2017/3/14.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  autoLogin:false;autoLoginChecked:boolean=false;

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }



  buildForm(){
    this.loginForm = this.fb.group({
      'userName':['',[Validators.required]],
      'password': ['',Validators.required],
      'forgetPass':[this.autoLoginChecked]
    });
    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = ''; //相当于重置错误信息
      const control = form.get(field); //获取表单中对应字段的组件
      if (control && control.dirty && !control.valid) { //当组件不正确的时候，获取值被改变的时候
        this.submitted=true;
        const messages = this.validationMessages[field];
        console.log( control.errors);
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'userName': '',
    'password': ''
  };

  validationMessages = {
    'userName': {
      'required':'请填写用户名',
    },
    'password':{
      'required':'请填写用户密码',
    }
  };

  onSubmit(value: string): void {
    console.log(this.loginForm.value);
    this.router.navigate(['backend-frame', 'QR-code-manage', 'overview']);
    // this.router.navigateByUrl("/backend-frame/QR-code-manage/overview");
  }

}
