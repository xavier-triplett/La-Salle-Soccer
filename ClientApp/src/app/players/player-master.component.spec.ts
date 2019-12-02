import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMasterComponent } from './player-master.component';

describe('PlayerMasterComponent', () => {
  let component: PlayerMasterComponent;
  let fixture: ComponentFixture<PlayerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
