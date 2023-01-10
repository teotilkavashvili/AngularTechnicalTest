import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './routes';


const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.WORKSPACE,
    pathMatch: 'full',
  },
  {
    path: ROUTES.WORKSPACE,
    loadChildren: () =>
      import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
