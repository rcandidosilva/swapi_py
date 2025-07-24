import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVehicle } from '../vehicle.model';

import { VehicleService } from './vehicle.service';

describe('Vehicle Service', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  let elemDefault: IVehicle;
  let expectedResult: IVehicle | IVehicle[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VehicleService);
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
      vehicleClass: 'AAAAAAA',
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

    it('should return a list of Vehicle', () => {
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
          vehicleClass: 'BBBBBB',
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

    describe('addVehicleToCollectionIfMissing', () => {
      it('should add a Vehicle to an empty array', () => {
        const vehicle: IVehicle = { id: 123 };
        expectedResult = service.addVehicleToCollectionIfMissing([], vehicle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vehicle);
      });

      it('should not add a Vehicle to an array that contains it', () => {
        const vehicle: IVehicle = { id: 123 };
        const vehicleCollection: IVehicle[] = [
          {
            ...vehicle,
          },
          { id: 456 },
        ];
        expectedResult = service.addVehicleToCollectionIfMissing(vehicleCollection, vehicle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Vehicle to an array that doesn't contain it", () => {
        const vehicle: IVehicle = { id: 123 };
        const vehicleCollection: IVehicle[] = [{ id: 456 }];
        expectedResult = service.addVehicleToCollectionIfMissing(vehicleCollection, vehicle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vehicle);
      });

      it('should add only unique Vehicle to an array', () => {
        const vehicleArray: IVehicle[] = [{ id: 123 }, { id: 456 }, { id: 80786 }];
        const vehicleCollection: IVehicle[] = [{ id: 123 }];
        expectedResult = service.addVehicleToCollectionIfMissing(vehicleCollection, ...vehicleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vehicle: IVehicle = { id: 123 };
        const vehicle2: IVehicle = { id: 456 };
        expectedResult = service.addVehicleToCollectionIfMissing([], vehicle, vehicle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vehicle);
        expect(expectedResult).toContain(vehicle2);
      });

      it('should accept null and undefined values', () => {
        const vehicle: IVehicle = { id: 123 };
        expectedResult = service.addVehicleToCollectionIfMissing([], null, vehicle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vehicle);
      });

      it('should return initial array if no Vehicle is added', () => {
        const vehicleCollection: IVehicle[] = [{ id: 123 }];
        expectedResult = service.addVehicleToCollectionIfMissing(vehicleCollection, undefined, null);
        expect(expectedResult).toEqual(vehicleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
