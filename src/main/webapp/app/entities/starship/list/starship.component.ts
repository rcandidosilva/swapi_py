import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IStarship } from '../starship.model';
import { StarshipService } from '../service/starship.service';

@Component({
  selector: 'jhi-starship',
  templateUrl: './starship.component.html',
})
export class StarshipComponent implements OnInit {
  starships?: IStarship[];
  isLoading = false;

  constructor(protected starshipService: StarshipService) {}

  loadAll(): void {
    this.isLoading = true;

    this.starshipService.query().subscribe({
      next: (res: HttpResponse<IStarship[]>) => {
        this.isLoading = false;
        this.starships = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IStarship): number {
    return item.id!;
  }
}
