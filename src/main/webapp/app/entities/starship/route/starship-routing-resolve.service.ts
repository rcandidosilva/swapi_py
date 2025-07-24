import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStarship, Starship } from '../starship.model';
import { StarshipService } from '../service/starship.service';

@Injectable({ providedIn: 'root' })
export class StarshipRoutingResolveService implements Resolve<IStarship> {
  constructor(protected service: StarshipService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStarship> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((starship: HttpResponse<Starship>) => {
          if (starship.body) {
            return of(starship.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Starship());
  }
}
