import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TropheesHallComponent } from './trophees-hall.component';

describe('TropheesHallComponent', () => {
  let component: TropheesHallComponent;
  let fixture: ComponentFixture<TropheesHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TropheesHallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TropheesHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
