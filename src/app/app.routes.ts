import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WorkspaceComponent } from './workspace/workspace.component';

export const appRoutes=[
	{
		path:'',
		redirectTo:'login',
		pathMatch:'full'
	},
	{
		path:"login",
		component:LoginComponent
	},
	{
		path:"workspace",
		component:WorkspaceComponent
	},
	{
		path:'**',//fallback router must in the last
		component:LoginComponent
	}
];
