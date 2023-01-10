import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { WorkSpaceRoutingModule } from './workspace-routing.module';
import { SearchComponent } from './search/search.component';
import { TaskColumnsComponent } from './task-columns/task-columns.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    WorkSpaceRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [
    WorkspaceComponent, 
    SearchComponent,
    TaskColumnsComponent]
})
export class WorkspaceModule { }
