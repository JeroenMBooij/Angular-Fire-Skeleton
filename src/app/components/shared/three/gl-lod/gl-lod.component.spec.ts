import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlLodComponent } from './gl-lod.component';

describe('GlLodComponent', () => {
  let component: GlLodComponent;
  let fixture: ComponentFixture<GlLodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlLodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlLodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
