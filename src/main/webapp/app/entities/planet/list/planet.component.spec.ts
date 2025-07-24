import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlanetService } from '../service/planet.service';

import { PlanetComponent } from './planet.component';

describe('Planet Management Component', () => {
  let comp: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;
  let service: PlanetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlanetComponent],
    })
      .overrideTemplate(PlanetComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanetComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PlanetService);

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
    expect(comp.planets?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
