import { Routes } from '@angular/router';
import { ROUTES } from '@enums/routes.enum';

export const routes: Routes = [
	{
		path: "",
		redirectTo: ROUTES.HOME,
		pathMatch: "full"
	},
	{
		path: ROUTES.COMPLETED_TASKS,
		loadComponent: () => import('./pages/completed-tasks/completed-tasks.component').then(c => c.CompletedTasksComponent)
	},
	{
		path: ROUTES.HOME,
		loadComponent: () => import('./pages/today-tasks/today-tasks.component').then(c => c.TodayTasksComponent)
	},
	{
		path: "**",
		redirectTo: ROUTES.HOME
	}
];
