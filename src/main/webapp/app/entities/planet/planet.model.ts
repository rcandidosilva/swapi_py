import dayjs from 'dayjs/esm';
import { IPerson } from 'app/entities/person/person.model';
import { ISpecies } from 'app/entities/species/species.model';
import { IFilm } from 'app/entities/film/film.model';

export interface IPlanet {
  id?: number;
  created?: dayjs.Dayjs | null;
  edited?: dayjs.Dayjs | null;
  name?: string | null;
  rotationPeriod?: number | null;
  orbitalPeriod?: number | null;
  diameter?: number | null;
  climate?: string | null;
  gravity?: string | null;
  terrain?: string | null;
  surfaceWater?: number | null;
  population?: number | null;
  people?: IPerson[] | null;
  species?: ISpecies[] | null;
  films?: IFilm[] | null;
}

export class Planet implements IPlanet {
  constructor(
    public id?: number,
    public created?: dayjs.Dayjs | null,
    public edited?: dayjs.Dayjs | null,
    public name?: string | null,
    public rotationPeriod?: number | null,
    public orbitalPeriod?: number | null,
    public diameter?: number | null,
    public climate?: string | null,
    public gravity?: string | null,
    public terrain?: string | null,
    public surfaceWater?: number | null,
    public population?: number | null,
    public people?: IPerson[] | null,
    public species?: ISpecies[] | null,
    public films?: IFilm[] | null
  ) {}
}

export function getPlanetIdentifier(planet: IPlanet): number | undefined {
  return planet.id;
}
