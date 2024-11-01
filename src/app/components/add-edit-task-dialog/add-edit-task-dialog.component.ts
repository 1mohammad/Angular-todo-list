import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskModel } from '@models/task.model';

@Component({
  selector: 'app-add-edit-task-dialog',
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
  templateUrl: './add-edit-task-dialog.component.html',
  styleUrl: './add-edit-task-dialog.component.scss'
})
export class AddEditTaskDialogComponent {
	readonly dialogRef = inject(MatDialogRef<AddEditTaskDialogComponent>);
	readonly data = inject<TaskModel>(MAT_DIALOG_DATA);
	readonly title = model(this.data.title);
	readonly date = model(this.data.date || new Date());
	readonly description = model(this.data.description);
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
}
