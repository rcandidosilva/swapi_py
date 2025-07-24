import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IFilm } from '../film.model';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'jhi-film',
  templateUrl: './film.component.html',
})
export class FilmComponent implements OnInit {
  films?: IFilm[];
  isLoading = false;

  constructor(protected filmService: FilmService) {}

  loadAll(): void {
    this.isLoading = true;

    this.filmService.query().subscribe({
      next: (res: HttpResponse<IFilm[]>) => {
        this.isLoading = false;
        this.films = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IFilm): number {
    return item.id!;
  }
}
