import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from '@components/header/header.component';
import { SideNavComponent } from "@components/side-nav/side-nav.component";

@Component({
	selector: 'app-main-layout',
	standalone: true,
	imports: [
		MatSidenavModule,
		SideNavComponent,
		HeaderComponent,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnDestroy {
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor() {
		const changeDetectorRef = inject(ChangeDetectorRef);
		const media = inject(MediaMatcher);

		this.mobileQuery = media.matchMedia('(max-width: 767px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
	}
}
