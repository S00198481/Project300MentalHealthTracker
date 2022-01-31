import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentCorrelationComponent } from './sentiment-correlation.component';

describe('SentimentCorrelationComponent', () => {
  let component: SentimentCorrelationComponent;
  let fixture: ComponentFixture<SentimentCorrelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentCorrelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentCorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
