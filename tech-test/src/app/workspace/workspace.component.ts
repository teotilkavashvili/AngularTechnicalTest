import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditTaskComponent } from './create-edit-task/create-edit-task.component';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  updateData: Subject<boolean> = new Subject();

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
    dialogRef.afterClosed().
    pipe(take(1)).
    subscribe(result => {
      if (result == null || result.isEmpty)
        return;
      this.taskService.createTask(result).subscribe(
        (response) => {
          this.updateData.next(true);          
          this.alertMessage('success')
        },
        (error) => {
          this.updateData.next(false);          
          this.alertMessage('error');
        },
      );
    });

  }
  alertMessage(message:string){
    this.dialog.open(AlertDialogComponent,{
      data:{
        message: message,
      },
    });
  }
  
}
