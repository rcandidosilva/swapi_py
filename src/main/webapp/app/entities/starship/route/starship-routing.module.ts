import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StarshipComponent } from '../list/starship.component';
import { StarshipDetailComponent } from '../detail/starship-detail.component';
import { StarshipRoutingResolveService } from './starship-routing-resolve.service';

const starshipRoute: Routes = [
  {
    path: '',
    component: StarshipComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StarshipDetailComponent,
    resolve: {
      starship: StarshipRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(starshipRoute)],
  exports: [RouterModule],
})
export class StarshipRoutingModule {}
