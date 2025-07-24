import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StarshipComponent } from './list/starship.component';
import { StarshipDetailComponent } from './detail/starship-detail.component';
import { StarshipRoutingModule } from './route/starship-routing.module';

@NgModule({
  imports: [SharedModule, StarshipRoutingModule],
  declarations: [StarshipComponent, StarshipDetailComponent],
})
export class StarshipModule {}
