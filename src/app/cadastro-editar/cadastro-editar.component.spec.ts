import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEditarComponent } from './cadastro-editar.component';

describe('CadastroEditarComponent', () => {
  let component: CadastroEditarComponent;
  let fixture: ComponentFixture<CadastroEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
