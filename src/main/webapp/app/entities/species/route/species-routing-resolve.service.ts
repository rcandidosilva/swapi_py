import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISpecies, Species } from '../species.model';
import { SpeciesService } from '../service/species.service';

@Injectable({ providedIn: 'root' })
export class SpeciesRoutingResolveService implements Resolve<ISpecies> {
  constructor(protected service: SpeciesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpecies> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((species: HttpResponse<Species>) => {
          if (species.body) {
            return of(species.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Species());
  }
}
