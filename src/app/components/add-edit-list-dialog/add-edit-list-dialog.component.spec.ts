import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditListDialogComponent } from './add-edit-list-dialog.component';

describe('AddEditListDialogComponent', () => {
  let component: AddEditListDialogComponent;
  let fixture: ComponentFixture<AddEditListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditListDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
