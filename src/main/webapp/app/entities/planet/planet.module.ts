import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlanetComponent } from './list/planet.component';
import { PlanetDetailComponent } from './detail/planet-detail.component';
import { PlanetRoutingModule } from './route/planet-routing.module';

@NgModule({
  imports: [SharedModule, PlanetRoutingModule],
  declarations: [PlanetComponent, PlanetDetailComponent],
})
export class PlanetModule {}
