import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rodo } from './rodo';

describe('Rodo', () => {
  let component: Rodo;
  let fixture: ComponentFixture<Rodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rodo],
    }).compileComponents();

    fixture = TestBed.createComponent(Rodo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
