import {Component, OnInit} from '@angular/core';
import {RequestService} from "../providers/request.service";

@Component({
  selector: 'backend-frame',
  templateUrl: './backend-frame.component.html',
  styleUrls: ['./backend-frame.component.scss']
})
export class BackendFrameComponent implements OnInit {
  constructor(public service: RequestService) {
  }

  ngOnInit() {
      console.log('333', this.service, this.service.userName);
  }
}
