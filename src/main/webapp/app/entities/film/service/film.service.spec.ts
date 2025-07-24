import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFilm } from '../film.model';

import { FilmService } from './film.service';

describe('Film Service', () => {
  let service: FilmService;
  let httpMock: HttpTestingController;
  let elemDefault: IFilm;
  let expectedResult: IFilm | IFilm[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FilmService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      created: currentDate,
      edited: currentDate,
      title: 'AAAAAAA',
      episodeId: 0,
      openingCrawl: 'AAAAAAA',
      director: 'AAAAAAA',
      producer: 'AAAAAAA',
      releaseDate: currentDate,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
          releaseDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of Film', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
          title: 'BBBBBB',
          episodeId: 1,
          openingCrawl: 'BBBBBB',
          director: 'BBBBBB',
          producer: 'BBBBBB',
          releaseDate: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          created: currentDate,
          edited: currentDate,
          releaseDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addFilmToCollectionIfMissing', () => {
      it('should add a Film to an empty array', () => {
        const film: IFilm = { id: 123 };
        expectedResult = service.addFilmToCollectionIfMissing([], film);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(film);
      });

      it('should not add a Film to an array that contains it', () => {
        const film: IFilm = { id: 123 };
        const filmCollection: IFilm[] = [
          {
            ...film,
          },
          { id: 456 },
        ];
        expectedResult = service.addFilmToCollectionIfMissing(filmCollection, film);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Film to an array that doesn't contain it", () => {
        const film: IFilm = { id: 123 };
        const filmCollection: IFilm[] = [{ id: 456 }];
        expectedResult = service.addFilmToCollectionIfMissing(filmCollection, film);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(film);
      });

      it('should add only unique Film to an array', () => {
        const filmArray: IFilm[] = [{ id: 123 }, { id: 456 }, { id: 84457 }];
        const filmCollection: IFilm[] = [{ id: 123 }];
        expectedResult = service.addFilmToCollectionIfMissing(filmCollection, ...filmArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const film: IFilm = { id: 123 };
        const film2: IFilm = { id: 456 };
        expectedResult = service.addFilmToCollectionIfMissing([], film, film2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(film);
        expect(expectedResult).toContain(film2);
      });

      it('should accept null and undefined values', () => {
        const film: IFilm = { id: 123 };
        expectedResult = service.addFilmToCollectionIfMissing([], null, film, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(film);
      });

      it('should return initial array if no Film is added', () => {
        const filmCollection: IFilm[] = [{ id: 123 }];
        expectedResult = service.addFilmToCollectionIfMissing(filmCollection, undefined, null);
        expect(expectedResult).toEqual(filmCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
