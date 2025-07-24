import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPlanet } from '../planet.model';

import { PlanetService } from './planet.service';

describe('Planet Service', () => {
  let service: PlanetService;
  let httpMock: HttpTestingController;
  let elemDefault: IPlanet;
  let expectedResult: IPlanet | IPlanet[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlanetService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      created: currentDate,
      edited: currentDate,
      name: 'AAAAAAA',
      rotationPeriod: 0,
      orbitalPeriod: 0,
      diameter: 0,
      climate: 'AAAAAAA',
      gravity: 'AAAAAAA',
      terrain: 'AAAAAAA',
      surfaceWater: 0,
      population: 0,
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

    it('should return a list of Planet', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
          name: 'BBBBBB',
          rotationPeriod: 1,
          orbitalPeriod: 1,
          diameter: 1,
          climate: 'BBBBBB',
          gravity: 'BBBBBB',
          terrain: 'BBBBBB',
          surfaceWater: 1,
          population: 1,
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

    describe('addPlanetToCollectionIfMissing', () => {
      it('should add a Planet to an empty array', () => {
        const planet: IPlanet = { id: 123 };
        expectedResult = service.addPlanetToCollectionIfMissing([], planet);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planet);
      });

      it('should not add a Planet to an array that contains it', () => {
        const planet: IPlanet = { id: 123 };
        const planetCollection: IPlanet[] = [
          {
            ...planet,
          },
          { id: 456 },
        ];
        expectedResult = service.addPlanetToCollectionIfMissing(planetCollection, planet);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Planet to an array that doesn't contain it", () => {
        const planet: IPlanet = { id: 123 };
        const planetCollection: IPlanet[] = [{ id: 456 }];
        expectedResult = service.addPlanetToCollectionIfMissing(planetCollection, planet);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planet);
      });

      it('should add only unique Planet to an array', () => {
        const planetArray: IPlanet[] = [{ id: 123 }, { id: 456 }, { id: 67031 }];
        const planetCollection: IPlanet[] = [{ id: 123 }];
        expectedResult = service.addPlanetToCollectionIfMissing(planetCollection, ...planetArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const planet: IPlanet = { id: 123 };
        const planet2: IPlanet = { id: 456 };
        expectedResult = service.addPlanetToCollectionIfMissing([], planet, planet2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planet);
        expect(expectedResult).toContain(planet2);
      });

      it('should accept null and undefined values', () => {
        const planet: IPlanet = { id: 123 };
        expectedResult = service.addPlanetToCollectionIfMissing([], null, planet, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planet);
      });

      it('should return initial array if no Planet is added', () => {
        const planetCollection: IPlanet[] = [{ id: 123 }];
        expectedResult = service.addPlanetToCollectionIfMissing(planetCollection, undefined, null);
        expect(expectedResult).toEqual(planetCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
