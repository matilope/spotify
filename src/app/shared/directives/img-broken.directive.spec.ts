import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgBrokenDirective } from './img-broken.directive';

@Component({
  template: '<img appImgBroken [src]="srcMock" />'
})

class TestComponent {
  public srcMock: any = null;
}

describe('ImgBrokenDirective', () => {
  let renderer2: Renderer2;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  // se ejecuta antes de cada enunciado
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ImgBrokenDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const elementRef = new ElementRef('');
    const directive = new ImgBrokenDirective(renderer2, elementRef);
    expect(directive).toBeTruthy();
  });

  it('TestComponent should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Directive should change image', (done: DoneFn) => {
    const beforeImgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    const beforeImgSrc = beforeImgElement.src; // url antes de ser cambiada por la directiva
    // arrange
    component.srcMock = undefined;

    setTimeout(()=>{
      const afterImgElement = fixture.debugElement.query(By.css('img')).nativeElement;
      const afterImgSrc = beforeImgElement.src; // url antes de ser cambiada por la directiva

      expect(afterImgSrc).toMatch("http://localhost:9876/assets/images/img-broken.png");
      done();
    }, 3000);

  });

});
