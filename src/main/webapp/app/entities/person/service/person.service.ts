import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPerson, getPersonIdentifier } from '../person.model';

export type EntityResponseType = HttpResponse<IPerson>;
export type EntityArrayResponseType = HttpResponse<IPerson[]>;

@Injectable({ providedIn: 'root' })
export class PersonService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/people');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPerson>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPerson[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addPersonToCollectionIfMissing(personCollection: IPerson[], ...peopleToCheck: (IPerson | null | undefined)[]): IPerson[] {
    const people: IPerson[] = peopleToCheck.filter(isPresent);
    if (people.length > 0) {
      const personCollectionIdentifiers = personCollection.map(personItem => getPersonIdentifier(personItem)!);
      const peopleToAdd = people.filter(personItem => {
        const personIdentifier = getPersonIdentifier(personItem);
        if (personIdentifier == null || personCollectionIdentifiers.includes(personIdentifier)) {
          return false;
        }
        personCollectionIdentifiers.push(personIdentifier);
        return true;
      });
      return [...peopleToAdd, ...personCollection];
    }
    return personCollection;
  }

  protected convertDateFromClient(person: IPerson): IPerson {
    return Object.assign({}, person, {
      created: person.created?.isValid() ? person.created.toJSON() : undefined,
      edited: person.edited?.isValid() ? person.edited.toJSON() : undefined,
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
      res.body.forEach((person: IPerson) => {
        person.created = person.created ? dayjs(person.created) : undefined;
        person.edited = person.edited ? dayjs(person.edited) : undefined;
      });
    }
    return res;
  }
}
