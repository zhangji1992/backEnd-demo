import {Component, OnInit, Output} from '@angular/core';
import {User} from "./user";
import {RequestService} from "../../../providers/request.service";
import {Router} from "@angular/router";
// import {UserService} from "./user.service";
import {ConfirmationService} from "primeng/primeng";
import {forEach} from "@angular/router/src/utils/collection";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
  // providers: [UserService],
})
export class UserManageComponent implements OnInit {
  /*这里是全选用到的标量*/
  ifAllSelected: boolean = false;
  selectedUsers: string[] = [];
  userform: FormGroup;
  submitted: boolean = false;

  default = 1;
  searchForm = {
    pageSize: 10,
    pageNo: 1,
    loginName: '',
    name: '',
    is_login: this.default
  };

  users: any[]; //分页读取到的列表数据

  newTabPanel: string = '添加用户';                 //新标签页名称
  ifTab1Active: boolean = true;
  ifTab2Active: boolean = false;
  isSubmittedClicked:boolean=false; //保存按钮是否被触发

  user: User = new User('','', '', '', '', 1, false, '');

  constructor(private router: Router,
              // private service: UserService,
              private cService: ConfirmationService) {
  }

  ngOnInit() {
    this.search();
    this.buildForm();
  }

  alertDialog(errorMsg) {

  }

  search() {
    // this.service.searchForm(this.searchForm)
    //   .then(products => {
    //     console.log('search get', products);
    //     this.users = products.items;
    //   }, error => {
    //     this.alertDialog(error);
    //   }).catch(err => {
    //
    // })
  }

  /*
   * 创建FromGroup对象，并且创建fromControl验证
   */
  buildForm() {
    this.userform = new FormGroup({
      id:new FormControl(this.user.id),
      loginName: new FormControl(this.user.loginName, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      password: new FormControl(this.user.password),
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      userNo: new FormControl(this.user.userNo),
      is_login: new FormControl(this.user.is_login),
      role: new FormControl(this.user.role),
      remarks: new FormControl(this.user.remarks)
    })
    this.userform.valueChanges
      .subscribe(data => this.onValueChanged(data));
    // this.onValueChanged(); // (re)set validation messages now
  }

  /*
   * form表单中的值有变化的时候触发的方法
   */
  onValueChanged(data?: any) {

    if (!this.userform) {
      return;
    }
    const form = this.userform;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = ''; //相当于重置错误信息
      const control = form.get(field); //获取表单中对应字段的组件
      if (control && (control.dirty || (this.isSubmittedClicked && !control.touched)) && !control.valid) { //当组件不正确的时候，获取值被改变的时候
        this.submitted = true;
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    loginName: '',
    username: '',
  };

  validationMessages = {
    'loginName': {
      'required': '请填写登录名',
      'maxlength': '登录名不得超过10个字'
    },
    'username': {
      'required': '请填写姓名',
      'maxlength': '姓名不得超过10个字'
    }
  };


  reset() {
    this.searchForm.loginName = null;
    this.searchForm.name = null;
    this.searchForm.is_login = this.default;
  }

  edit(product) {
     console.log('eidt', product);
     this.newTabPanel = '编辑用户';
     this.ifTab1Active = false;
     this.ifTab2Active = true;
    this.userform.reset({id:product.id,loginName: product.loginName, password:product.password,username:product.username,userNo:product.userNo,is_login:product.is_login,role:false,remarks:product.remarks});
     /*let param = {
      id: product.id
     };
      this.service.addOrEdit(param)
     .then(item => {
       this.initProduct(item);
     }, error => {
      this.alertDialog(error)
     }); */
  }

  changeTab(event) {
    console.log('ininin', event.index);
    if (event.index == 0) {
      this.newTabPanel = '添加用户';
      this.ifTab1Active = true;
      this.ifTab2Active = false;
    } else if (event.index == 1) {
      this.ifTab1Active = false;
      this.ifTab2Active = true;
      this.isSubmittedClicked=false;
      //重置form表单中的数据
      this.userform.reset({id:'',loginName: '', password:'',username: '',userNo:'',is_login:1,role:false,remarks:''});
      /*
      let param = {
        id: ''
      };
      this.service.addOrEdit(param)
        .then(item => {
          this.initProduct(item);
        }, error => {
          console.log('111', error);
          this.dialogHeader = '提示';
          this.confirmationService.confirm({
            message: error,
            accept: () => {
              this.ifTab1Active = true;
              this.ifTab2Active = false;
            },
            reject: () => {
              this.ifTab1Active = true;
              this.ifTab2Active = false;
            }
          });
        });*/
    }
  }

  backToList() {
    this.newTabPanel = '添加用户';
    this.ifTab1Active = true;
    this.ifTab2Active = false;
  }

  onSubmit(data) {
    this.isSubmittedClicked=true;
    if(this.userform.valid){
      var _self=this;
      if(!data.id){
        _self.users.push(data);
      }else{
        _self.users.forEach(function(value,key){
          if(value.id==data.id){
            _self.users[key]=data;
          }
        })
      }
      this.newTabPanel = '添加用户';
      this.ifTab1Active = true;
      this.ifTab2Active = false;
      // this.search();
    }else{
      this.onValueChanged();
      return false;
    }




    /*
     this.service.save(param)
     .then(res => {
     this.newTabPanel = '添加产品';

     this.ifTab1Active = true;
     this.ifTab2Active = false;

     this.search();
     }, error => {
     this.alertDialog(error)
     });*/
  }


  delete(product) {
    this.cService.confirm({
      message: '确定要删除该用户么',
      header: '删除用户',
      key: 'usermanageDialogKey',
      accept: () => {
        let param = [{
          id: product.id
        }];
        /*this.service.del(param)
         .then(res => {
         this.search();
         }, error => {
         this.alertDialog(error)
         });*/
        let deleteIndex: number;
        this.users.forEach(function (arr, index) {
          if (arr.id == product.id) {
            deleteIndex = index;
          }
        })
        this.users.splice(deleteIndex, 1);
      }
    });

  }

  batchDel() {
    let _self = this;
    this.cService.confirm({
      message: '确定要批量删除用户吗？',
      header: '批量删除',
      key: 'usermanageDialogKey',
      accept: () => {
        /*this.service.del(param)
         .then(res => {
         this.search();
         }, error => {

         this.alertDialog(error)
         });*/
        let newUsers: any[] = [];
        _self.users.forEach(function (arr, index) {
          let count = 0;
          _self.selectedUsers.forEach(function (selectUser, key) {
            if (arr.id == selectUser) {
              count++;
            }
          })
          if (count == 0) {
            newUsers.push(arr)
          }
        });
        _self.users = newUsers;
      }
    })
  }


  selectAll() {
    let temp = [];
    if (this.ifAllSelected == true) {
      for (let item of this.users) {
        for (let prop in item) {
          if (prop == 'id') {
            temp.push(item[prop]);
          }
        }
      }
      this.selectedUsers = temp;
    } else {
      this.selectedUsers = [];
    }
  }
}


