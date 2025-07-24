import dayjs from 'dayjs/esm';
import { IFilm } from 'app/entities/film/film.model';
import { IPerson } from 'app/entities/person/person.model';

export interface IStarship {
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
  hyperdriveRating?: number | null;
  mglt?: number | null;
  startshipClass?: string | null;
  films?: IFilm[] | null;
  pilots?: IPerson[] | null;
}

export class Starship implements IStarship {
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
    public hyperdriveRating?: number | null,
    public mglt?: number | null,
    public startshipClass?: string | null,
    public films?: IFilm[] | null,
    public pilots?: IPerson[] | null
  ) {}
}

export function getStarshipIdentifier(starship: IStarship): number | undefined {
  return starship.id;
}
