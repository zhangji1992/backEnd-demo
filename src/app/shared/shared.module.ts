import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { PaginationModule } from 'ng2-bootstrap';

@NgModule({
  imports:[ 
  	CommonModule,
    FormsModule,
    ReactiveFormsModule,
  	TranslateModule,
    PaginationModule.forRoot()
  ],
  declarations:[

  ],
  exports:[
  	CommonModule,
  	FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})

export class SharedModule {
    
}