import { Component, EventEmitter, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MyListsNavComponent } from '@components/my-lists-nav/my-lists-nav.component';
import { ROUTES } from '@enums/routes.enum';

interface menuItems {
	routerLink: string[],
	icon: string,
	title: string
}

@Component({
	selector: 'app-side-nav',
	standalone: true,
	imports: [
		MatListModule,
		MatIconModule,
		MatDividerModule,
		RouterModule,
		MyListsNavComponent
	],
	templateUrl: './side-nav.component.html',
	styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
	@Output() closeSidenav = new EventEmitter<void>();
	menuItems: menuItems[] = [
		{
			icon: 'home',
			routerLink: ['/' + ROUTES.HOME],
			title: 'Today\'s Tasks'
		},
		{
			icon: 'done',
			routerLink: ['/' + ROUTES.COMPLETED_TASKS],
			title: 'Completed Missions'
		}
	]
}
