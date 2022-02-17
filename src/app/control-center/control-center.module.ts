import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlCenterComponent } from './control-center.component';
import { ControlCenterRoutingModule } from './control-center-routing.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, ControlCenterRoutingModule],
  declarations: [ControlCenterComponent],
  exports: [ControlCenterComponent]
})
export class ControlCenterComponentModule {
}
