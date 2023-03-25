import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  // @Input() customImg!: string;
  @HostListener('error') handleError():void {
    this.renderer.setProperty(this.element.nativeElement, "src", "assets/images/img-broken.png");
    // this.renderer.setProperty(this.element.nativeElement, "src", this.customImg);
  };

  constructor(private readonly renderer: Renderer2, private readonly element: ElementRef) { }

  // Se puede incluso crear una directiva para que afecte al padre y luego ir manipulando a sus hijos accediendo a los mismos.

}
