import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVehicle, getVehicleIdentifier } from '../vehicle.model';

export type EntityResponseType = HttpResponse<IVehicle>;
export type EntityArrayResponseType = HttpResponse<IVehicle[]>;

@Injectable({ providedIn: 'root' })
export class VehicleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vehicles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVehicle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVehicle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  addVehicleToCollectionIfMissing(vehicleCollection: IVehicle[], ...vehiclesToCheck: (IVehicle | null | undefined)[]): IVehicle[] {
    const vehicles: IVehicle[] = vehiclesToCheck.filter(isPresent);
    if (vehicles.length > 0) {
      const vehicleCollectionIdentifiers = vehicleCollection.map(vehicleItem => getVehicleIdentifier(vehicleItem)!);
      const vehiclesToAdd = vehicles.filter(vehicleItem => {
        const vehicleIdentifier = getVehicleIdentifier(vehicleItem);
        if (vehicleIdentifier == null || vehicleCollectionIdentifiers.includes(vehicleIdentifier)) {
          return false;
        }
        vehicleCollectionIdentifiers.push(vehicleIdentifier);
        return true;
      });
      return [...vehiclesToAdd, ...vehicleCollection];
    }
    return vehicleCollection;
  }

  protected convertDateFromClient(vehicle: IVehicle): IVehicle {
    return Object.assign({}, vehicle, {
      created: vehicle.created?.isValid() ? vehicle.created.toJSON() : undefined,
      edited: vehicle.edited?.isValid() ? vehicle.edited.toJSON() : undefined,
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
      res.body.forEach((vehicle: IVehicle) => {
        vehicle.created = vehicle.created ? dayjs(vehicle.created) : undefined;
        vehicle.edited = vehicle.edited ? dayjs(vehicle.edited) : undefined;
      });
    }
    return res;
  }
}
