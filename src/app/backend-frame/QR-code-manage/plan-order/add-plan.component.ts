import {Component, OnInit} from "@angular/core";
import {Message, SelectItem} from "primeng/primeng";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    moduleId:'app/modules/main-frame/pro/layout-model/',
    selector:'add-plan',
    templateUrl:'add-plan.component.html'
})
export class AddPlanComponent implements OnInit{
  msgs: Message[] = [];
  userform: FormGroup;
  submitted: boolean;
  genders: SelectItem[];

  description: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userform = this.fb.group({
      'firstname':['',Validators.required],
      'lastname': ['',Validators.required],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      'description':[''],
      'gender':['',Validators.required]
    });

    /*this.genders = [];
    this.genders.push({label:'Select Gender', value:''});
    this.genders.push({label:'Male', value:'Male'});
    this.genders.push({label:'Female', value:'Female'});*/
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }

}
