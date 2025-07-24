import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StarshipService } from '../service/starship.service';

import { StarshipComponent } from './starship.component';

describe('Starship Management Component', () => {
  let comp: StarshipComponent;
  let fixture: ComponentFixture<StarshipComponent>;
  let service: StarshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StarshipComponent],
    })
      .overrideTemplate(StarshipComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StarshipComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StarshipService);

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
    expect(comp.starships?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
