import { Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[appFancy]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class Fancy {

  private el = inject(ElementRef);

  presetDefaults: { [key: string]: any } = {
    border: '2px solid blue',
    borderRadius: '8px',
    backgroundColor: 'lightyellow',
    fontWeight: 'bold',
    paddingLeft: '4px',
  };
  @Input() appFancy = '';

  onMouseEnter() {
    this.addFancyEffects();
  }

  onMouseLeave() {
    this.removeFancyEffects();
  }

  private addFancyEffects() {
    var fancyColor = this.appFancy || this.presetDefaults['backgroundColor'];
    this.el.nativeElement.style.backgroundColor = fancyColor;
    this.el.nativeElement.style.border = this.presetDefaults['border'];
    this.el.nativeElement.style.borderRadius = this.presetDefaults['borderRadius'];
    this.el.nativeElement.style.fontWeight = this.presetDefaults['fontWeight'];
    this.el.nativeElement.style.paddingLeft = this.presetDefaults['paddingLeft'];
  }

  private removeFancyEffects() {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.border = '';
    this.el.nativeElement.style.borderRadius = '';
    this.el.nativeElement.style.fontWeight = '';
    this.el.nativeElement.style.paddingLeft = '';
  }
}
