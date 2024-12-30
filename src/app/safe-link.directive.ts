import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  @Input({ alias: 'appSafeLink' }) queryParam = 'myapp';

  constructor() {}

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const hasParams = this.hostElementRef.nativeElement.href.includes('?');
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + `${hasParams ? '&' : '?'}from=${this.queryParam}`;

      return;
    } else {
      event?.preventDefault();
    }
  }
}
