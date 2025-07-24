import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ISpecies } from '../species.model';
import { SpeciesService } from '../service/species.service';

@Component({
  selector: 'jhi-species',
  templateUrl: './species.component.html',
})
export class SpeciesComponent implements OnInit {
  species?: ISpecies[];
  isLoading = false;

  constructor(protected speciesService: SpeciesService) {}

  loadAll(): void {
    this.isLoading = true;

    this.speciesService.query().subscribe({
      next: (res: HttpResponse<ISpecies[]>) => {
        this.isLoading = false;
        this.species = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISpecies): number {
    return item.id!;
  }
}
