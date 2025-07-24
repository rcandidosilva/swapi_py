import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFilm, getFilmIdentifier } from '../film.model';

export type EntityResponseType = HttpResponse<IFilm>;
export type EntityArrayResponseType = HttpResponse<IFilm[]>;

@Injectable({ providedIn: 'root' })
export class FilmService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/films');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFilm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFilm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addFilmToCollectionIfMissing(filmCollection: IFilm[], ...filmsToCheck: (IFilm | null | undefined)[]): IFilm[] {
    const films: IFilm[] = filmsToCheck.filter(isPresent);
    if (films.length > 0) {
      const filmCollectionIdentifiers = filmCollection.map(filmItem => getFilmIdentifier(filmItem)!);
      const filmsToAdd = films.filter(filmItem => {
        const filmIdentifier = getFilmIdentifier(filmItem);
        if (filmIdentifier == null || filmCollectionIdentifiers.includes(filmIdentifier)) {
          return false;
        }
        filmCollectionIdentifiers.push(filmIdentifier);
        return true;
      });
      return [...filmsToAdd, ...filmCollection];
    }
    return filmCollection;
  }

  protected convertDateFromClient(film: IFilm): IFilm {
    return Object.assign({}, film, {
      created: film.created?.isValid() ? film.created.toJSON() : undefined,
      edited: film.edited?.isValid() ? film.edited.toJSON() : undefined,
      releaseDate: film.releaseDate?.isValid() ? film.releaseDate.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created ? dayjs(res.body.created) : undefined;
      res.body.edited = res.body.edited ? dayjs(res.body.edited) : undefined;
      res.body.releaseDate = res.body.releaseDate ? dayjs(res.body.releaseDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((film: IFilm) => {
        film.created = film.created ? dayjs(film.created) : undefined;
        film.edited = film.edited ? dayjs(film.edited) : undefined;
        film.releaseDate = film.releaseDate ? dayjs(film.releaseDate) : undefined;
      });
    }
    return res;
  }
}
