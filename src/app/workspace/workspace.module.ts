import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { LeftNavComponent } from '../left-nav/left-nav.component';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { FooterInfoComponent } from '../footer-info/footer-info.component';
import { PostTableComponent } from '../post-table/post-table.component';
import { UserTableComponent } from '../user-table/user-table.component';
import { ModalModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';

import { PostTableService } from '../post-table/services/post-table.service';

import { workspaceRoutes } from './workspace.routes';

@NgModule({
    imports: [
        SharedModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        RouterModule.forChild(workspaceRoutes)
    ],
    exports: [],
    declarations: [
        WorkspaceComponent,
        LeftNavComponent,
        TopMenuComponent,
        FooterInfoComponent,
        PostTableComponent,
        UserTableComponent
    ],
    providers: [
	    PostTableService
    ],
})
export class WorkspaceModule { }
