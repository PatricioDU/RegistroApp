import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { misdatosPage } from './misdatos.page';

describe('misdatosPage', () => {
  let component: misdatosPage;
  let fixture: ComponentFixture<misdatosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [misdatosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(misdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
