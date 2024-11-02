import { Component, input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
	selector: 'app-slogan',
	standalone: true,
	imports: [
		AngularSvgIconModule
	],
	templateUrl: './slogan.component.html',
	styleUrl: './slogan.component.scss'
})
export class SloganComponent {
	icon = input<string>();
	title = input<string>();
	description = input<string>();
}
