import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountComponent } from './manage.component';

describe('ManageComponent', () => {
  let component: ManageAccountComponent;
  let fixture: ComponentFixture<ManageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
