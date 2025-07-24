import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlanet, getPlanetIdentifier } from '../planet.model';

export type EntityResponseType = HttpResponse<IPlanet>;
export type EntityArrayResponseType = HttpResponse<IPlanet[]>;

@Injectable({ providedIn: 'root' })
export class PlanetService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/planets');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlanet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlanet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addPlanetToCollectionIfMissing(planetCollection: IPlanet[], ...planetsToCheck: (IPlanet | null | undefined)[]): IPlanet[] {
    const planets: IPlanet[] = planetsToCheck.filter(isPresent);
    if (planets.length > 0) {
      const planetCollectionIdentifiers = planetCollection.map(planetItem => getPlanetIdentifier(planetItem)!);
      const planetsToAdd = planets.filter(planetItem => {
        const planetIdentifier = getPlanetIdentifier(planetItem);
        if (planetIdentifier == null || planetCollectionIdentifiers.includes(planetIdentifier)) {
          return false;
        }
        planetCollectionIdentifiers.push(planetIdentifier);
        return true;
      });
      return [...planetsToAdd, ...planetCollection];
    }
    return planetCollection;
  }

  protected convertDateFromClient(planet: IPlanet): IPlanet {
    return Object.assign({}, planet, {
      created: planet.created?.isValid() ? planet.created.toJSON() : undefined,
      edited: planet.edited?.isValid() ? planet.edited.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created ? dayjs(res.body.created) : undefined;
      res.body.edited = res.body.edited ? dayjs(res.body.edited) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((planet: IPlanet) => {
        planet.created = planet.created ? dayjs(planet.created) : undefined;
        planet.edited = planet.edited ? dayjs(planet.edited) : undefined;
      });
    }
    return res;
  }
}
