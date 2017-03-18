import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animations/fly-in';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  animations: [
    flyIn
  ]
})
export class UserTableComponent implements OnInit {
	public maxSize:number = 5;
    public itemsPerPage:number=5;
    public totalItems:number = 15;
    public currentPage:number = 1;

  constructor() { }

  ngOnInit() {
  	
  }

}
