import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditTaskComponent } from '../create-edit-task/create-edit-task.component';
import { AlertDialogComponent } from 'src/app/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialog/confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-task-columns',
  templateUrl: './task-columns.component.html',
  styleUrls: ['./task-columns.component.scss']
})
export class TaskColumnsComponent implements OnInit {
  @Input() refreshTable :Subject <boolean>;
  tasks: Task[] = [];
  allTask: Task[] = [];
  editTaskinfo={};

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }
  ngOnChanges(changes: SimpleChanges): void{
    this.refreshTable.pipe(take(1),
    filter(status=>!!status)).
    subscribe(()=> { 
        this.fillTaskGrid();     
    });
  }


  ngOnInit() {
    this.fillTaskGrid();
  }

  onSearchTask(keyword: string): void {
    this.tasks=this.allTask.filter(
      task => task.label.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );    
  }

  fillTaskGrid() {
    this.taskService.getTasks().
    pipe(take(1)).
    subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
          this.allTask=[...this.tasks]
    })
        
  }
  changeStatus(completed: boolean, task) {
    task.done = completed ? new Date : false
    this.taskService.editTask(task).subscribe(
        (response)=>{
          this.fillTaskGrid();
        }
    )
  }

  editTask(task:Task){
    let dialogRef = this.dialog.open(CreateEditTaskComponent
      , {
        disableClose: true,
        width: '600px',
        data: task
      });
    dialogRef.afterClosed().
    pipe(take(1)).
    subscribe(result => {
      if (result == null || result.isEmpty)
        return;
        result.id = task.id;
      this.taskService.editTask(result).subscribe(
        (response) => {
          this.fillTaskGrid();
          this.alertMessage('success');
        },
        (error) => {
          this.alertMessage('error');
        },
      );
    });

  }

  deleteTask(id:number){
    this.taskService.deleteTask(id).
    pipe(take(1)).
    subscribe(
      (response) => {
        this.fillTaskGrid();
        this.alertMessage('success');
        },
        (error) => {
          this.alertMessage('error');
      })
  }

  alertMessage(message:string){
    this.dialog.open(AlertDialogComponent,{
      data:{
        message: message,
      },
  });

  }
}
