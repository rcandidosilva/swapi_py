import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStarship } from '../starship.model';

@Component({
  selector: 'jhi-starship-detail',
  templateUrl: './starship-detail.component.html',
})
export class StarshipDetailComponent implements OnInit {
  starship: IStarship | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ starship }) => {
      this.starship = starship;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
