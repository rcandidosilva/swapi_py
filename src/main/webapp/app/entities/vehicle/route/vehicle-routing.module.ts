import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VehicleComponent } from '../list/vehicle.component';
import { VehicleDetailComponent } from '../detail/vehicle-detail.component';
import { VehicleRoutingResolveService } from './vehicle-routing-resolve.service';

const vehicleRoute: Routes = [
  {
    path: '',
    component: VehicleComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VehicleDetailComponent,
    resolve: {
      vehicle: VehicleRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(vehicleRoute)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
