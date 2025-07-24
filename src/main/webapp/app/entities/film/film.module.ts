import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FilmComponent } from './list/film.component';
import { FilmDetailComponent } from './detail/film-detail.component';
import { FilmRoutingModule } from './route/film-routing.module';

@NgModule({
  imports: [SharedModule, FilmRoutingModule],
  declarations: [FilmComponent, FilmDetailComponent],
})
export class FilmModule {}
