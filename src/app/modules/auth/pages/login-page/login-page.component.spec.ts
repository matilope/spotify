import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Las pruebas unitarias deben probar un bloque de codigo
  // Debe de asegurarse que el formulario sea invalido cuando ingresen datos erroneos
  // PATRON AAA, modo de trabajar ordenado, ARRANGE, ACT, ASSERT
  it('It should return invalid form', () => {
    // arrange
    const mockCredenciales = {
      email: 'asd',
      password: 'asd'
    }
    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('password');

    //act
    emailForm?.setValue(mockCredenciales.email);
    passwordForm?.setValue(mockCredenciales.password);

    // assert
    expect(component.formLogin.invalid).toEqual(true); // toBeTrue();
  });

  it('It should return valid form', () => {
    // arrange
    const mockCredenciales = {
      email: 'test@test.com',
      password: '12345678'
    }
    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('password');

    //act
    emailForm?.setValue(mockCredenciales.email);
    passwordForm?.setValue(mockCredenciales.password);

    // assert
    expect(component.formLogin.invalid).toEqual(false); // toBeTrue();
  });

  it('Button text should be "Iniciar sesión"', () => {
    /* 
    const elementRef = document.querySelector('.form-action button');
    const getInnerText = elementRef?.textContent;
    */
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getInnerText = elementRef.nativeElement.textContent;
    expect(getInnerText).toEqual("Iniciar sesión"); // toBeTrue();
  });
});
