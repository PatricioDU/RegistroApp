import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage as IngresoPage } from './ingreso.page';

describe('LoginPage', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
