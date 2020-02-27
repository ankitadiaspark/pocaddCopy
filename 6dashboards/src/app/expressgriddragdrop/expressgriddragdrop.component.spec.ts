import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressgriddragdropComponent } from './expressgriddragdrop.component';

describe('ExpressgriddragdropComponent', () => {
  let component: ExpressgriddragdropComponent;
  let fixture: ComponentFixture<ExpressgriddragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressgriddragdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressgriddragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
