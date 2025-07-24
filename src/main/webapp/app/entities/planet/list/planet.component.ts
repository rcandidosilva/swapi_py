import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IPlanet } from '../planet.model';
import { PlanetService } from '../service/planet.service';

@Component({
  selector: 'jhi-planet',
  templateUrl: './planet.component.html',
})
export class PlanetComponent implements OnInit {
  planets?: IPlanet[];
  isLoading = false;

  constructor(protected planetService: PlanetService) {}

  loadAll(): void {
    this.isLoading = true;

    this.planetService.query().subscribe({
      next: (res: HttpResponse<IPlanet[]>) => {
        this.isLoading = false;
        this.planets = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPlanet): number {
    return item.id!;
  }
}
