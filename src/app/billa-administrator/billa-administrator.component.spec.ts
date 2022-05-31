import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillaAdministratorComponent } from './billa-administrator.component';

describe('BillaAdministratorComponent', () => {
  let component: BillaAdministratorComponent;
  let fixture: ComponentFixture<BillaAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillaAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillaAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
