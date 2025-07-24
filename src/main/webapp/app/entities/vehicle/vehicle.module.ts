import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VehicleComponent } from './list/vehicle.component';
import { VehicleDetailComponent } from './detail/vehicle-detail.component';
import { VehicleRoutingModule } from './route/vehicle-routing.module';

@NgModule({
  imports: [SharedModule, VehicleRoutingModule],
  declarations: [VehicleComponent, VehicleDetailComponent],
})
export class VehicleModule {}
