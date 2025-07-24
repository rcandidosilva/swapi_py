import dayjs from 'dayjs/esm';
import { IFilm } from 'app/entities/film/film.model';
import { IPerson } from 'app/entities/person/person.model';

export interface IVehicle {
  id?: number;
  created?: dayjs.Dayjs | null;
  edited?: dayjs.Dayjs | null;
  name?: string | null;
  model?: string | null;
  manufacturer?: string | null;
  costInCredits?: number | null;
  length?: number | null;
  maxAtmospheringSpeed?: number | null;
  crew?: number | null;
  passengers?: number | null;
  cargoCapacity?: number | null;
  consumables?: string | null;
  vehicleClass?: string | null;
  films?: IFilm[] | null;
  pilots?: IPerson[] | null;
}

export class Vehicle implements IVehicle {
  constructor(
    public id?: number,
    public created?: dayjs.Dayjs | null,
    public edited?: dayjs.Dayjs | null,
    public name?: string | null,
    public model?: string | null,
    public manufacturer?: string | null,
    public costInCredits?: number | null,
    public length?: number | null,
    public maxAtmospheringSpeed?: number | null,
    public crew?: number | null,
    public passengers?: number | null,
    public cargoCapacity?: number | null,
    public consumables?: string | null,
    public vehicleClass?: string | null,
    public films?: IFilm[] | null,
    public pilots?: IPerson[] | null
  ) {}
}

export function getVehicleIdentifier(vehicle: IVehicle): number | undefined {
  return vehicle.id;
}
