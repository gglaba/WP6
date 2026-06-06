import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailed } from './room-detailed';

describe('RoomDetailed', () => {
  let component: RoomDetailed;
  let fixture: ComponentFixture<RoomDetailed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailed],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDetailed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
