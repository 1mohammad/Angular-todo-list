import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: "",
		redirectTo: "today-tasks",
		pathMatch: "full"
	},
	{
		path: "all-tasks",
		loadComponent: () => import('./pages/all-tasks/all-tasks.component').then(c => c.AllTasksComponent)
	},
	{
		path: "completed-tasks",
		loadComponent: () => import('./pages/completed-tasks/completed-tasks.component').then(c => c.CompletedTasksComponent)
	},
	{
		path: "today-tasks",
		loadComponent: () => import('./pages/today-tasks/today-tasks.component').then(c => c.TodayTasksComponent)
	},
	{
		path: "**",
		redirectTo: "today-tasks"
	}
];
