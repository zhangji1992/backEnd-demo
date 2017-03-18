import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

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
		loadChildren:'./workspace/workspace.module#WorkspaceModule'
	},
	{
		path:'**',//fallback router must in the last
		component:LoginComponent
	}
];
