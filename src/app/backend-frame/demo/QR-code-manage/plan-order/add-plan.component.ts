import {Component, OnInit} from "@angular/core";
import { SelectItem} from "primeng/primeng";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddPlanData} from "./planData";
import {planService} from "./plan.service";

@Component({
    moduleId:'app/modules/main-frame/pro/layout-model/',
    selector:'add-plan',
    templateUrl:'add-plan.component.html',
    providers:[planService]
})
export class AddPlanComponent implements OnInit{

  userform: FormGroup;
  submitted: boolean;

  products: SelectItem[]=[{label:'Select City', value:'1'},{label:'New York', value:'2'}];
  // selectedProduct:any;

  constructor(private fb: FormBuilder,private planservice:planService) {}

  addplanData:AddPlanData;

  ngOnInit() {
    this.buildForm();

    /*为什么要在他之后赋值？*/
   /* this.products = [];
    this.products.push({label:'Select City', value:'1'});
    this.products.push({label:'New York', value:'2'});
    this.products.push({label:'Rome', value:'3'});
    this.products.push({label:'London', value:4});*/


  }

  buildForm(){
    this.userform = this.fb.group({
      'planName':['',[Validators.required, Validators.maxLength(10), Validators.minLength(3),]],
      'selectedProduct': [this.products[1],Validators.required],
      'note': ['', [
        Validators.maxLength(10),
      ]]
    });
    this.userform.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.userform) { return; }
    const form = this.userform;
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
    'planName': '',
    'selectedProduct': '',
    'note':''
  };

  validationMessages = {
    'planName': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 5 characters long.',
      'maxlength':     'Name cannot be more than 24 characters long.',

    },
    'selectedProduct':{
      'required':      'alterEgo is required.',

    },
    'note': {
      'maxlength':     'Name cannot be more than 10 characters long.',
    }
  };

  onSubmit(value: string) {
    // this.planData=this.userform.value; //这里是刚好表单中的数据格式就是hero类的格式
    console.log(this.userform.value);
    this.planservice.addPlanData(this.addplanData);
  }

}
