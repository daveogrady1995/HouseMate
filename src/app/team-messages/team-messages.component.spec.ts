import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMessagesComponent } from './team-messages.component';

describe('TeamMessagesComponent', () => {
  let component: TeamMessagesComponent;
  let fixture: ComponentFixture<TeamMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
