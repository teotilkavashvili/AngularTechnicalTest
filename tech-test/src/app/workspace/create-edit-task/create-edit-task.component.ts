import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-edit-task',
  templateUrl: './create-edit-task.component.html',
  styleUrls: ['./create-edit-task.component.scss']
})
export class CreateEditTaskComponent implements OnInit {
  registerTaskForm: FormGroup;
  submitted:boolean = false;
  isCreate:boolean=false;
  taskId:any;
  disabled=true;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) { }

  ngOnInit() {
    if(this.data.id){
      this.isCreate=false
    }else{
      this.isCreate=true;
    }    
    this.registerTaskForm = this.formBuilder.group({
      id: [''],
      done:new FormControl({ value: '', disabled: this.disabled }),
      label: new FormControl('', [Validators.required,]),
      description: new FormControl('', [Validators.required,]),
      category: new FormControl('', [Validators.required,]),
      
    });
  }

  get f() { return this.registerTaskForm.controls; }

  onSubmit() {
    console.log("form",this.registerTaskForm.value);
    this.submitted = true;
    if (this.registerTaskForm.invalid) {
      return;
    }else {
      if (!this.isCreate) {
        this.registerTaskForm.patchValue({
          id: this.data.id,
          done:this.data.done
        });
      }else{        
        const uniqueId=uuid();
        this.registerTaskForm.patchValue({
          id: uniqueId,
          done:false
        });
      }
      var clickedButtonName = document.activeElement.getAttribute("Name");
      let isCostumerSubmitPermitted = this.setTaskStatus(
        clickedButtonName
      );
    }
  }

  setTaskStatus(btnName) {
    let isPermitted = true;
    switch (btnName) {
      case "save": {
        console.log("save")
        this.taskService.createTask(this.registerTaskForm.value).subscribe(
              (response) => {
                console.log(response)
              },)
        this.dialogRef.close(this.registerTaskForm.value);
        break;
      }
      case "cancel": {
        this.onNoClick();
        break
      }
    }
    return isPermitted;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
