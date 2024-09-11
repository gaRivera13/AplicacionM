import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisDatosPage } from './mis-datos.page';
import { IonicModule } from '@ionic/angular';

describe('MisDatosPage', () => {
  let component: MisDatosPage;
  let fixture: ComponentFixture<MisDatosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MisDatosPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MisDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
