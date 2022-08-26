import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './mainlayout/mainlayout.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [RouterModule, SharedModule],
  providers: [],
  declarations: [MainLayoutComponent],
  exports: [MainLayoutComponent]
})
export class LayoutModule {}
