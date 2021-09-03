import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private initialColorBackground: string = '#ffffff';
  private defaultHeight: number = 200;

  constructor(private el: ElementRef){
    this.setHeight(this.defaultHeight);
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.defaultColor);
    this.setBackground(this.defaultColor);
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
    this.setBackground(this.initialColorBackground);
  }

  private setBorder(color: string){
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number){
    this.el.nativeElement.style.height = height + 'px';
  }

  private setBackground(color: string){
    this.el.nativeElement.style.background = color;
  }
}