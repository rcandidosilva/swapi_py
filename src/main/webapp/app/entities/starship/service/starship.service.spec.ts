import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStarship } from '../starship.model';

import { StarshipService } from './starship.service';

describe('Starship Service', () => {
  let service: StarshipService;
  let httpMock: HttpTestingController;
  let elemDefault: IStarship;
  let expectedResult: IStarship | IStarship[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StarshipService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      created: currentDate,
      edited: currentDate,
      name: 'AAAAAAA',
      model: 'AAAAAAA',
      manufacturer: 'AAAAAAA',
      costInCredits: 0,
      length: 0,
      maxAtmospheringSpeed: 0,
      crew: 0,
      passengers: 0,
      cargoCapacity: 0,
      consumables: 'AAAAAAA',
      hyperdriveRating: 0,
      mglt: 0,
      startshipClass: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of Starship', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
          name: 'BBBBBB',
          model: 'BBBBBB',
          manufacturer: 'BBBBBB',
          costInCredits: 1,
          length: 1,
          maxAtmospheringSpeed: 1,
          crew: 1,
          passengers: 1,
          cargoCapacity: 1,
          consumables: 'BBBBBB',
          hyperdriveRating: 1,
          mglt: 1,
          startshipClass: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          created: currentDate,
          edited: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addStarshipToCollectionIfMissing', () => {
      it('should add a Starship to an empty array', () => {
        const starship: IStarship = { id: 123 };
        expectedResult = service.addStarshipToCollectionIfMissing([], starship);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(starship);
      });

      it('should not add a Starship to an array that contains it', () => {
        const starship: IStarship = { id: 123 };
        const starshipCollection: IStarship[] = [
          {
            ...starship,
          },
          { id: 456 },
        ];
        expectedResult = service.addStarshipToCollectionIfMissing(starshipCollection, starship);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Starship to an array that doesn't contain it", () => {
        const starship: IStarship = { id: 123 };
        const starshipCollection: IStarship[] = [{ id: 456 }];
        expectedResult = service.addStarshipToCollectionIfMissing(starshipCollection, starship);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(starship);
      });

      it('should add only unique Starship to an array', () => {
        const starshipArray: IStarship[] = [{ id: 123 }, { id: 456 }, { id: 85659 }];
        const starshipCollection: IStarship[] = [{ id: 123 }];
        expectedResult = service.addStarshipToCollectionIfMissing(starshipCollection, ...starshipArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const starship: IStarship = { id: 123 };
        const starship2: IStarship = { id: 456 };
        expectedResult = service.addStarshipToCollectionIfMissing([], starship, starship2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(starship);
        expect(expectedResult).toContain(starship2);
      });

      it('should accept null and undefined values', () => {
        const starship: IStarship = { id: 123 };
        expectedResult = service.addStarshipToCollectionIfMissing([], null, starship, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(starship);
      });

      it('should return initial array if no Starship is added', () => {
        const starshipCollection: IStarship[] = [{ id: 123 }];
        expectedResult = service.addStarshipToCollectionIfMissing(starshipCollection, undefined, null);
        expect(expectedResult).toEqual(starshipCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
