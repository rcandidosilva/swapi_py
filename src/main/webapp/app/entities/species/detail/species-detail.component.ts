import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecies } from '../species.model';

@Component({
  selector: 'jhi-species-detail',
  templateUrl: './species-detail.component.html',
})
export class SpeciesDetailComponent implements OnInit {
  species: ISpecies | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ species }) => {
      this.species = species;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
