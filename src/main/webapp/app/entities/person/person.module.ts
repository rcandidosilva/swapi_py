import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersonComponent } from './list/person.component';
import { PersonDetailComponent } from './detail/person-detail.component';
import { PersonRoutingModule } from './route/person-routing.module';

@NgModule({
  imports: [SharedModule, PersonRoutingModule],
  declarations: [PersonComponent, PersonDetailComponent],
})
export class PersonModule {}
