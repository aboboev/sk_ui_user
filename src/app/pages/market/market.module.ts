import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { MarketPage } from './market.page';
import { MarketChartsComponent } from './charts/market.charts.component';
import { MarketInteractComponent } from './interact/market.interact.component';

export const routes = [{ path: '', component: MarketPage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [MarketPage, MarketChartsComponent, MarketInteractComponent],
  providers: [],
  exports: [RouterModule]
})
export class MarketModule {}
