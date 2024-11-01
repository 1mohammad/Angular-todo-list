import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListsNavComponent } from './my-lists-nav.component';

describe('MyListsNavComponent', () => {
  let component: MyListsNavComponent;
  let fixture: ComponentFixture<MyListsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyListsNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyListsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
