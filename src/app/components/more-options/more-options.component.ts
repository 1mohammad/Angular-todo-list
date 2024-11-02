import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Options } from '@models/more-options.model';

@Component({
	selector: 'app-more-options',
	standalone: true,
	imports: [
		MatMenuModule,
		MatButtonModule,
		MatIconModule
	],
	templateUrl: './more-options.component.html',
	styleUrl: './more-options.component.scss'
})
export class MoreOptionsComponent {
	options = input<Options[]>();

}
