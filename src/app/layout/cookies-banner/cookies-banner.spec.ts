import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesBanner } from './cookies-banner';

describe('CookiesBanner', () => {
  let component: CookiesBanner;
  let fixture: ComponentFixture<CookiesBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
