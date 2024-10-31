import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: "all-tasks",
		loadComponent: () => import('./pages/all-tasks/all-tasks.component').then(c => c.AllTasksComponent)
	},
	{
		path: "**",
		redirectTo: "daily-tasks"
	}
];
