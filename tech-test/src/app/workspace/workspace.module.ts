import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace.component';
import { WorkSpaceRoutingModule } from './workspace-routing.module';
import { SearchComponent } from './search/search.component';
import { TaskColumnsComponent } from './task-columns/task-columns.component';

@NgModule({
  imports: [
    CommonModule,
    WorkSpaceRoutingModule
  ],
  declarations: [
    WorkspaceComponent, 
    SearchComponent,
    TaskColumnsComponent]
})
export class WorkspaceModule { }
