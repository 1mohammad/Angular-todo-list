import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ListDialogData } from '@models/list.model';

@Component({
  selector: 'app-add-edit-list-dialog',
  standalone: true,
  imports: [
	MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
	MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-edit-list-dialog.component.html',
  styleUrl: './add-edit-list-dialog.component.scss'
})
export class AddEditListDialogComponent {
	readonly dialogRef = inject(MatDialogRef<AddEditListDialogComponent>);
	readonly data = inject<ListDialogData>(MAT_DIALOG_DATA);
	readonly title = model(this.data.title);
	readonly date = model(this.data.date || new Date());
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
