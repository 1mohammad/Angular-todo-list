import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from "@components/side-nav/side-nav.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    SideNavComponent
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
	menuExpanded = false;
	
	toggleMenuExpand () {
		this.menuExpanded = !this.menuExpanded;
	}
}
