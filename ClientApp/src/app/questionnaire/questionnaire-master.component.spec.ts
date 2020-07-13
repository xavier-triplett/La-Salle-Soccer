import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireMasterComponent } from './questionnaire-master.component';

describe('QuestionnaireMasterComponent', () => {
  let component: QuestionnaireMasterComponent;
  let fixture: ComponentFixture<QuestionnaireMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
