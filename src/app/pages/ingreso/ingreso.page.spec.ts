import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ingresoPage } from './ingreso.page';

describe('LoginPage', () => {
  let component: ingresoPage;
  let fixture: ComponentFixture<ingresoPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ingresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
