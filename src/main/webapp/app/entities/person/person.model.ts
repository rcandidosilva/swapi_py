import dayjs from 'dayjs/esm';
import { IPlanet } from 'app/entities/planet/planet.model';
import { ISpecies } from 'app/entities/species/species.model';
import { IVehicle } from 'app/entities/vehicle/vehicle.model';
import { IStarship } from 'app/entities/starship/starship.model';
import { IFilm } from 'app/entities/film/film.model';

export interface IPerson {
  id?: number;
  created?: dayjs.Dayjs | null;
  edited?: dayjs.Dayjs | null;
  name?: string | null;
  height?: number | null;
  mass?: number | null;
  hairColor?: string | null;
  skinColor?: string | null;
  eyeyColor?: string | null;
  birthYear?: string | null;
  gender?: string | null;
  homeworld?: IPlanet | null;
  species?: ISpecies[] | null;
  vehicles?: IVehicle[] | null;
  starships?: IStarship[] | null;
  films?: IFilm[] | null;
}

export class Person implements IPerson {
  constructor(
    public id?: number,
    public created?: dayjs.Dayjs | null,
    public edited?: dayjs.Dayjs | null,
    public name?: string | null,
    public height?: number | null,
    public mass?: number | null,
    public hairColor?: string | null,
    public skinColor?: string | null,
    public eyeyColor?: string | null,
    public birthYear?: string | null,
    public gender?: string | null,
    public homeworld?: IPlanet | null,
    public species?: ISpecies[] | null,
    public vehicles?: IVehicle[] | null,
    public starships?: IStarship[] | null,
    public films?: IFilm[] | null
  ) {}
}

export function getPersonIdentifier(person: IPerson): number | undefined {
  return person.id;
}
