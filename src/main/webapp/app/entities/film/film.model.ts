import dayjs from 'dayjs/esm';
import { IPlanet } from 'app/entities/planet/planet.model';
import { IPerson } from 'app/entities/person/person.model';
import { IStarship } from 'app/entities/starship/starship.model';
import { IVehicle } from 'app/entities/vehicle/vehicle.model';
import { ISpecies } from 'app/entities/species/species.model';

export interface IFilm {
  id?: number;
  created?: dayjs.Dayjs | null;
  edited?: dayjs.Dayjs | null;
  title?: string | null;
  episodeId?: number | null;
  openingCrawl?: string | null;
  director?: string | null;
  producer?: string | null;
  releaseDate?: dayjs.Dayjs | null;
  planets?: IPlanet[] | null;
  characters?: IPerson[] | null;
  startships?: IStarship[] | null;
  vehicles?: IVehicle[] | null;
  species?: ISpecies[] | null;
}

export class Film implements IFilm {
  constructor(
    public id?: number,
    public created?: dayjs.Dayjs | null,
    public edited?: dayjs.Dayjs | null,
    public title?: string | null,
    public episodeId?: number | null,
    public openingCrawl?: string | null,
    public director?: string | null,
    public producer?: string | null,
    public releaseDate?: dayjs.Dayjs | null,
    public planets?: IPlanet[] | null,
    public characters?: IPerson[] | null,
    public startships?: IStarship[] | null,
    public vehicles?: IVehicle[] | null,
    public species?: ISpecies[] | null
  ) {}
}

export function getFilmIdentifier(film: IFilm): number | undefined {
  return film.id;
}
