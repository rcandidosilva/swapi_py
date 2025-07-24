import dayjs from 'dayjs/esm';
import { IPlanet } from 'app/entities/planet/planet.model';
import { IFilm } from 'app/entities/film/film.model';
import { IPerson } from 'app/entities/person/person.model';

export interface ISpecies {
  id?: number;
  created?: dayjs.Dayjs | null;
  edited?: dayjs.Dayjs | null;
  name?: string | null;
  classification?: string | null;
  designation?: string | null;
  averageHeight?: number | null;
  skinColors?: string | null;
  hairColors?: string | null;
  eyeColors?: string | null;
  averageLifespan?: number | null;
  languages?: string | null;
  homeworld?: IPlanet | null;
  films?: IFilm[] | null;
  persons?: IPerson[] | null;
}

export class Species implements ISpecies {
  constructor(
    public id?: number,
    public created?: dayjs.Dayjs | null,
    public edited?: dayjs.Dayjs | null,
    public name?: string | null,
    public classification?: string | null,
    public designation?: string | null,
    public averageHeight?: number | null,
    public skinColors?: string | null,
    public hairColors?: string | null,
    public eyeColors?: string | null,
    public averageLifespan?: number | null,
    public languages?: string | null,
    public homeworld?: IPlanet | null,
    public films?: IFilm[] | null,
    public persons?: IPerson[] | null
  ) {}
}

export function getSpeciesIdentifier(species: ISpecies): number | undefined {
  return species.id;
}
