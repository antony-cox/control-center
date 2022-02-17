import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlCenterComponent } from './control-center.component';

const routes: Routes = [
  {
    path: 'control-center',
    component: ControlCenterComponent
  },
  {
    path: '',
    redirectTo: '/control-center',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ControlCenterRoutingModule {}
