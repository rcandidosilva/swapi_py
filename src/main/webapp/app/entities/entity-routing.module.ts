import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vehicle',
        data: { pageTitle: 'Vehicles' },
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
      },
      {
        path: 'starship',
        data: { pageTitle: 'Starships' },
        loadChildren: () => import('./starship/starship.module').then(m => m.StarshipModule),
      },
      {
        path: 'species',
        data: { pageTitle: 'Species' },
        loadChildren: () => import('./species/species.module').then(m => m.SpeciesModule),
      },
      {
        path: 'person',
        data: { pageTitle: 'People' },
        loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
      },
      {
        path: 'film',
        data: { pageTitle: 'Films' },
        loadChildren: () => import('./film/film.module').then(m => m.FilmModule),
      },
      {
        path: 'planet',
        data: { pageTitle: 'Planets' },
        loadChildren: () => import('./planet/planet.module').then(m => m.PlanetModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
