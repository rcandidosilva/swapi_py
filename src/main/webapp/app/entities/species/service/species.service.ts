import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISpecies, getSpeciesIdentifier } from '../species.model';

export type EntityResponseType = HttpResponse<ISpecies>;
export type EntityArrayResponseType = HttpResponse<ISpecies[]>;

@Injectable({ providedIn: 'root' })
export class SpeciesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/species');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISpecies>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISpecies[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addSpeciesToCollectionIfMissing(speciesCollection: ISpecies[], ...speciesToCheck: (ISpecies | null | undefined)[]): ISpecies[] {
    const species: ISpecies[] = speciesToCheck.filter(isPresent);
    if (species.length > 0) {
      const speciesCollectionIdentifiers = speciesCollection.map(speciesItem => getSpeciesIdentifier(speciesItem)!);
      const speciesToAdd = species.filter(speciesItem => {
        const speciesIdentifier = getSpeciesIdentifier(speciesItem);
        if (speciesIdentifier == null || speciesCollectionIdentifiers.includes(speciesIdentifier)) {
          return false;
        }
        speciesCollectionIdentifiers.push(speciesIdentifier);
        return true;
      });
      return [...speciesToAdd, ...speciesCollection];
    }
    return speciesCollection;
  }

  protected convertDateFromClient(species: ISpecies): ISpecies {
    return Object.assign({}, species, {
      created: species.created?.isValid() ? species.created.toJSON() : undefined,
      edited: species.edited?.isValid() ? species.edited.toJSON() : undefined,
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
      res.body.forEach((species: ISpecies) => {
        species.created = species.created ? dayjs(species.created) : undefined;
        species.edited = species.edited ? dayjs(species.edited) : undefined;
      });
    }
    return res;
  }
}
