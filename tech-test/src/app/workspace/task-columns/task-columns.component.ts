import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditTaskComponent } from '../create-edit-task/create-edit-task.component';
import { AlertDialogComponent } from 'src/app/dialog/alert-dialog/alert-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-columns',
  templateUrl: './task-columns.component.html',
  styleUrls: ['./task-columns.component.scss']
})
export class TaskColumnsComponent implements OnInit {
  tasks: Task[] = [];
  allTask: Task[] = [];
  filteredTask: Task[] = [];
  filterOptions: any = {
    keyword: '',
  };

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.fillTaskGrid();
  }

  onSearchTask(keyword: string): void {
    console.log("keyword",keyword);
    this.tasks=this.allTask.filter(task => task.label.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));    
  }

  fillTaskGrid() {
    this.taskService.getTasks().subscribe(
        (tasks: Task[]) => {
          console.log(tasks);
          this.tasks = tasks;
          this.allTask=[...this.tasks]
    })
        
  }
  changeStatus(completed: boolean, id) {
    if(completed){
      const task ={
        'id':id,
        'done': new Date
      }
      this.taskService.editTask(task).subscribe(
        (response)=>{
          this.fillTaskGrid();
        }
      )
    }else{
      const task ={
        'id':id,
        'done': false
      }
      this.taskService.editTask(task).subscribe(
        (response)=>{
          this.fillTaskGrid();
        }
      )

    }
  }

  editTask(task:Task){
    let dialogRef = this.dialog.open(CreateEditTaskComponent
      , {
        disableClose: true,
        width: '600px',
        data: task
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null || result.isEmpty)
        return;
        result.id = task.id;
      this.taskService.editTask(result).subscribe(
        (response) => {
          this.fillTaskGrid();
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

  deleteTask(id:number){
    console.log(id);
    this.taskService.deleteTask(id).subscribe(
      (response) => {
        this.fillTaskGrid();
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
      })
  }
  updateData(status){
    if (status)
    this.fillTaskGrid();
    
  }
}
