import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISpecies } from '../species.model';

import { SpeciesService } from './species.service';

describe('Species Service', () => {
  let service: SpeciesService;
  let httpMock: HttpTestingController;
  let elemDefault: ISpecies;
  let expectedResult: ISpecies | ISpecies[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SpeciesService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      created: currentDate,
      edited: currentDate,
      name: 'AAAAAAA',
      classification: 'AAAAAAA',
      designation: 'AAAAAAA',
      averageHeight: 0,
      skinColors: 'AAAAAAA',
      hairColors: 'AAAAAAA',
      eyeColors: 'AAAAAAA',
      averageLifespan: 0,
      languages: 'AAAAAAA',
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

    it('should return a list of Species', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
          name: 'BBBBBB',
          classification: 'BBBBBB',
          designation: 'BBBBBB',
          averageHeight: 1,
          skinColors: 'BBBBBB',
          hairColors: 'BBBBBB',
          eyeColors: 'BBBBBB',
          averageLifespan: 1,
          languages: 'BBBBBB',
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

    describe('addSpeciesToCollectionIfMissing', () => {
      it('should add a Species to an empty array', () => {
        const species: ISpecies = { id: 123 };
        expectedResult = service.addSpeciesToCollectionIfMissing([], species);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(species);
      });

      it('should not add a Species to an array that contains it', () => {
        const species: ISpecies = { id: 123 };
        const speciesCollection: ISpecies[] = [
          {
            ...species,
          },
          { id: 456 },
        ];
        expectedResult = service.addSpeciesToCollectionIfMissing(speciesCollection, species);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Species to an array that doesn't contain it", () => {
        const species: ISpecies = { id: 123 };
        const speciesCollection: ISpecies[] = [{ id: 456 }];
        expectedResult = service.addSpeciesToCollectionIfMissing(speciesCollection, species);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(species);
      });

      it('should add only unique Species to an array', () => {
        const speciesArray: ISpecies[] = [{ id: 123 }, { id: 456 }, { id: 20828 }];
        const speciesCollection: ISpecies[] = [{ id: 123 }];
        expectedResult = service.addSpeciesToCollectionIfMissing(speciesCollection, ...speciesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const species: ISpecies = { id: 123 };
        const species2: ISpecies = { id: 456 };
        expectedResult = service.addSpeciesToCollectionIfMissing([], species, species2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(species);
        expect(expectedResult).toContain(species2);
      });

      it('should accept null and undefined values', () => {
        const species: ISpecies = { id: 123 };
        expectedResult = service.addSpeciesToCollectionIfMissing([], null, species, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(species);
      });

      it('should return initial array if no Species is added', () => {
        const speciesCollection: ISpecies[] = [{ id: 123 }];
        expectedResult = service.addSpeciesToCollectionIfMissing(speciesCollection, undefined, null);
        expect(expectedResult).toEqual(speciesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
