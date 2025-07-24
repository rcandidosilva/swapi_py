import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPerson } from '../person.model';

import { PersonService } from './person.service';

describe('Person Service', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;
  let elemDefault: IPerson;
  let expectedResult: IPerson | IPerson[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PersonService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      created: currentDate,
      edited: currentDate,
      name: 'AAAAAAA',
      height: 0,
      mass: 0,
      hairColor: 'AAAAAAA',
      skinColor: 'AAAAAAA',
      eyeyColor: 'AAAAAAA',
      birthYear: 'AAAAAAA',
      gender: 'AAAAAAA',
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

    it('should return a list of Person', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          edited: currentDate.format(DATE_TIME_FORMAT),
          name: 'BBBBBB',
          height: 1,
          mass: 1,
          hairColor: 'BBBBBB',
          skinColor: 'BBBBBB',
          eyeyColor: 'BBBBBB',
          birthYear: 'BBBBBB',
          gender: 'BBBBBB',
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

    describe('addPersonToCollectionIfMissing', () => {
      it('should add a Person to an empty array', () => {
        const person: IPerson = { id: 123 };
        expectedResult = service.addPersonToCollectionIfMissing([], person);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(person);
      });

      it('should not add a Person to an array that contains it', () => {
        const person: IPerson = { id: 123 };
        const personCollection: IPerson[] = [
          {
            ...person,
          },
          { id: 456 },
        ];
        expectedResult = service.addPersonToCollectionIfMissing(personCollection, person);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Person to an array that doesn't contain it", () => {
        const person: IPerson = { id: 123 };
        const personCollection: IPerson[] = [{ id: 456 }];
        expectedResult = service.addPersonToCollectionIfMissing(personCollection, person);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(person);
      });

      it('should add only unique Person to an array', () => {
        const personArray: IPerson[] = [{ id: 123 }, { id: 456 }, { id: 47292 }];
        const personCollection: IPerson[] = [{ id: 123 }];
        expectedResult = service.addPersonToCollectionIfMissing(personCollection, ...personArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const person: IPerson = { id: 123 };
        const person2: IPerson = { id: 456 };
        expectedResult = service.addPersonToCollectionIfMissing([], person, person2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(person);
        expect(expectedResult).toContain(person2);
      });

      it('should accept null and undefined values', () => {
        const person: IPerson = { id: 123 };
        expectedResult = service.addPersonToCollectionIfMissing([], null, person, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(person);
      });

      it('should return initial array if no Person is added', () => {
        const personCollection: IPerson[] = [{ id: 123 }];
        expectedResult = service.addPersonToCollectionIfMissing(personCollection, undefined, null);
        expect(expectedResult).toEqual(personCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
