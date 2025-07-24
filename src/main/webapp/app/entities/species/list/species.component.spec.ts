import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SpeciesService } from '../service/species.service';

import { SpeciesComponent } from './species.component';

describe('Species Management Component', () => {
  let comp: SpeciesComponent;
  let fixture: ComponentFixture<SpeciesComponent>;
  let service: SpeciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SpeciesComponent],
    })
      .overrideTemplate(SpeciesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SpeciesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SpeciesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.species?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
