import {Component, Input, OnInit} from '@angular/core';
import {RequestService} from "../../../providers/request.service";
import {ConfirmationService, Message, SelectItem, TreeNode} from 'primeng/primeng';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";
import {Menu} from "./menu";

@Component({
  selector: 'menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.scss']
})
export class MenuManageComponent implements OnInit {
  msgs: Message[] = [];

  menuForm: FormGroup;
  menu = new Menu('id', '3');
  formErrors = {
    'name': '',
  };
  validationMessages = {
    'name': {
      'required': "请输入姓名",
      'minlength': "姓名最少为4个字符",
      'maxlength': "姓名最多为10个字符"
    }
  };
  submitted: boolean = false;

  genders: SelectItem[];

  description: string;

  ifException: boolean = false;
  myException: string;

  pageNo: number = 1;
  pageSize: number = 10;

  newTabPanel: string = '菜单添加';                 //新标签页名称
  ifTab1Active: boolean = true;
  ifTab2Active: boolean = false;

  //添加/编辑菜单表单
  parentId: AbstractControl;
  name: string;
  order: number;
  url: string;
  target: string;
  icon: string;
  ifShow: boolean;
  identification: number;
  subSystem: string;
  ifManage: boolean;
  ifDecorate: boolean;
  remarks: string;

  gotoLog: boolean = false;

  powerTree: TreeNode[];        //接口返回的角色授权树形菜单
  selectedTrees: TreeNode[];   //已选的树形菜单

  tabViewCss = {
    'border': '1px solid red'
  };

  confirmDialogHeader: string;      //确认窗标题

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: RequestService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.buildForms();
  }

  buildForms() {
    this.menuForm = this.fb.group({
      'parentId': [this.menu.parentId],
      'name': [this.menu.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]],
      'order': [this.menu.order],
      'url': [this.menu.url],
      'target': [this.menu.target],
      'icon': [this.menu.icon],
      'ifShow': [this.menu.ifShow],
      'identify': [this.menu.identify],
      'ifManage': [this.menu.ifManage],
      'ifDecorate': [this.menu.ifDecorate],
      'remarks': [this.menu.remarks],
      //todo 更多表单控件
    });

    this.menuForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.menuForm) {
      console.log('un');
      return;
    }
    const form = this.menuForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(value: Object) {
    this.submitted = true;

    // this.service.post(value)
    // .then(data =>{
    //   console.log('submit success', data);
    // })

    // this.msgs = [];
    // this.msgs.push({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() {
    return JSON.stringify(this.menuForm.value);
  }

  //提示窗
  alertDialog(errorMsg) {
    this.ifException = true;
    this.myException = errorMsg;
  }

  confirmDialog() {
    this.ifException = false;
  }

  edit(product) {
    console.log('eidt', product);

    this.newTabPanel = '角色编辑';
    this.ifTab1Active = false;
    this.ifTab2Active = true;

    // this.newProduct = false;
    // this.product = this.cloneProduct(product);
    // this.displayDialog = true;

    let param = {
      id: product.id
    };
    this.service.addOrEdit(param)
      .then(item => {
        this.initData(item);
      }, error => {
        this.gotoLog = false;
        this.alertDialog(error);
      });
  }

  //初始化表单数据
  initData(item) {
    this.parentId = item.parentId;
    this.name = item.name;
    this.order = item.order;
    this.url = item.url;
    this.target = item.target;
    this.icon = item.icon;
    this.ifShow = item.ifShow;
    this.identification = item.identification;
    this.subSystem = item.subSystem;
    this.ifManage = item.ifManage;
    this.ifDecorate = item.ifDecorate;
    this.remarks = item.remarks;
  }

  changeTab(event) {
    console.log('ininin', event.index);
    if (event.index == 0) {
      this.newTabPanel = '菜单添加';
      this.ifTab1Active = true;
      this.ifTab2Active = false;
    } else if (event.index == 1) {
      this.ifTab1Active = false;
      this.ifTab2Active = true;

      this.initData({});

      // let param = {
      //   id: ''
      // };
      // this.service.addOrEdit(param)
      //   .then(item => {
      //     this.initData(item);
      //   }, error => {
      //     console.log('111', error);
      //     this.confirmationService.confirm({
      //       message: error,
      //       accept: () => {
      //         this.ifTab1Active = true;
      //         this.ifTab2Active = false;
      //       },
      //       reject: () => {
      //         this.ifTab1Active = true;
      //         this.ifTab2Active = false;
      //       }
      //     });
      //   });

    }
  }

  data_cancel() {
    this.newTabPanel = '角色添加';

    this.ifTab1Active = true;
    this.ifTab2Active = false;
  }

  data_save() {
    let param = {
      parentId: this.parentId,
      name: this.name,
      order: this.order,
      url: this.url,
      target: this.target,
      icon: this.icon,
      ifShow: this.ifShow,
      identification: this.identification,
      subSystem: this.subSystem,
      ifManage: this.ifManage,
      ifDecorate: this.ifDecorate,
      remarks: this.remarks
    };
    this.service.save(param)
      .then(res => {
        this.newTabPanel = '角色添加';

        this.ifTab1Active = true;
        this.ifTab2Active = false;

        // this.search();
      }, error => {
        this.gotoLog = false;
        this.alertDialog(error);
      });
  }
}
