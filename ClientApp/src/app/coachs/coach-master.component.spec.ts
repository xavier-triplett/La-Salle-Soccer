import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMasterComponent } from './coach-master.component';

describe('CoachMasterComponent', () => {
	let component: CoachMasterComponent;
	let fixture: ComponentFixture<CoachMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
		declarations: [CoachMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
	  fixture = TestBed.createComponent(CoachMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
