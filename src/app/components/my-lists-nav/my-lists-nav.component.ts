import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-my-lists-nav',
  standalone: true,
  imports: [
	MatDividerModule,
	MatListModule,
	MatIconModule
  ],
  templateUrl: './my-lists-nav.component.html',
  styleUrl: './my-lists-nav.component.scss'
})
export class MyListsNavComponent {

}
