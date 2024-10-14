import { ComponentFixture, TestBed } from '@angular/core/testing';
import { miclasePage } from './miclase.page';

describe('miclasePage', () => {
  let component: miclasePage;
  let fixture: ComponentFixture<miclasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(miclasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
