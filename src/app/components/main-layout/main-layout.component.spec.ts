import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menuExpanded property when toggleMenuExpand is called', () => {
    const initialMenuExpandedState = component.menuExpanded;

    component.toggleMenuExpand();
    expect(component.menuExpanded).toBe(!initialMenuExpandedState);

    component.toggleMenuExpand();
    expect(component.menuExpanded).toBe(initialMenuExpandedState);
  });
});
