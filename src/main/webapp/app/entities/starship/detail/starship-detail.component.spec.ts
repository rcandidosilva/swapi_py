import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StarshipDetailComponent } from './starship-detail.component';

describe('Starship Management Detail Component', () => {
  let comp: StarshipDetailComponent;
  let fixture: ComponentFixture<StarshipDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarshipDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ starship: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StarshipDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StarshipDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load starship on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.starship).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
