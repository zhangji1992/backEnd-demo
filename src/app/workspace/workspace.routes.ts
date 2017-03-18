import { RouterModule } from '@angular/router';
import { PostTableComponent } from '../post-table/post-table.component';
import { WorkspaceComponent } from './workspace.component';

export const workspaceRoutes=[
	{
        path:'',
        component:WorkspaceComponent,
        children: [
	    	{ path: '',redirectTo:'posttable/page/1',pathMatch:'full'},
	    	{ path: 'posttable/page/:page', component: PostTableComponent }
	    ]
    }
];