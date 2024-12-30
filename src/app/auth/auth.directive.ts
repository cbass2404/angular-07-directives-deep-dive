import { Directive, effect, Inject, Input } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  @Input({ required: true, alias: 'appAuth' }) userType!: Permission;
  @Inject(AuthService) private authService: AuthService = new AuthService();

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType) {
        console.log('SHOW ELEMENT');
      } else {
        console.log('DO NOT SHOW ELEMENT');
      }
    });
  }
}
