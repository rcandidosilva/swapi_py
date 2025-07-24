import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PersonComponent } from '../list/person.component';
import { PersonDetailComponent } from '../detail/person-detail.component';
import { PersonRoutingResolveService } from './person-routing-resolve.service';

const personRoute: Routes = [
  {
    path: '',
    component: PersonComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonDetailComponent,
    resolve: {
      person: PersonRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(personRoute)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
