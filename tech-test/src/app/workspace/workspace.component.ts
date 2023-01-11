import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditTaskComponent } from './create-edit-task/create-edit-task.component';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  @Output() updateData = new EventEmitter<boolean>();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
  }

  addTask(){
    let dialogRef = this.dialog.open(CreateEditTaskComponent
      , {
        width: '600px',
        data: {}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log("result",result);
      if (result == null || result.isEmpty)
        return;
      this.taskService.createTask(result).subscribe(
        (response) => {
          this.updateData.emit(true);          
          const dialogRef = this.dialog.open(AlertDialogComponent,{
            data:{
              message: 'success',
            },
          });
        },
        (error) => {
          const dialogRef = this.dialog.open(AlertDialogComponent,{
            data:{
              message: 'error',
            },
          });
        },
      );
    });

  }
 
}
