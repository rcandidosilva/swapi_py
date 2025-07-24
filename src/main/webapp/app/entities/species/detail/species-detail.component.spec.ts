import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpeciesDetailComponent } from './species-detail.component';

describe('Species Management Detail Component', () => {
  let comp: SpeciesDetailComponent;
  let fixture: ComponentFixture<SpeciesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeciesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ species: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(SpeciesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SpeciesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load species on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.species).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
