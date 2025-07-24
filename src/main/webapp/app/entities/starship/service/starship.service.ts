import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStarship, getStarshipIdentifier } from '../starship.model';

export type EntityResponseType = HttpResponse<IStarship>;
export type EntityArrayResponseType = HttpResponse<IStarship[]>;

@Injectable({ providedIn: 'root' })
export class StarshipService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/starships');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStarship>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStarship[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addStarshipToCollectionIfMissing(starshipCollection: IStarship[], ...starshipsToCheck: (IStarship | null | undefined)[]): IStarship[] {
    const starships: IStarship[] = starshipsToCheck.filter(isPresent);
    if (starships.length > 0) {
      const starshipCollectionIdentifiers = starshipCollection.map(starshipItem => getStarshipIdentifier(starshipItem)!);
      const starshipsToAdd = starships.filter(starshipItem => {
        const starshipIdentifier = getStarshipIdentifier(starshipItem);
        if (starshipIdentifier == null || starshipCollectionIdentifiers.includes(starshipIdentifier)) {
          return false;
        }
        starshipCollectionIdentifiers.push(starshipIdentifier);
        return true;
      });
      return [...starshipsToAdd, ...starshipCollection];
    }
    return starshipCollection;
  }

  protected convertDateFromClient(starship: IStarship): IStarship {
    return Object.assign({}, starship, {
      created: starship.created?.isValid() ? starship.created.toJSON() : undefined,
      edited: starship.edited?.isValid() ? starship.edited.toJSON() : undefined,
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
      res.body.forEach((starship: IStarship) => {
        starship.created = starship.created ? dayjs(starship.created) : undefined;
        starship.edited = starship.edited ? dayjs(starship.edited) : undefined;
      });
    }
    return res;
  }
}
