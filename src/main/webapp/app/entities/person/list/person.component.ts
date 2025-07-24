import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IPerson } from '../person.model';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'jhi-person',
  templateUrl: './person.component.html',
})
export class PersonComponent implements OnInit {
  people?: IPerson[];
  isLoading = false;

  constructor(protected personService: PersonService) {}

  loadAll(): void {
    this.isLoading = true;

    this.personService.query().subscribe({
      next: (res: HttpResponse<IPerson[]>) => {
        this.isLoading = false;
        this.people = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPerson): number {
    return item.id!;
  }
}
