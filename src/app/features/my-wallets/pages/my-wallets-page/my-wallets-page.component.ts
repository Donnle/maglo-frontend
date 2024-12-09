import { Component } from '@angular/core';
import { HorizontalTab } from '../../../../shared/interfaces/horizontal-tab.interface';
import { ButtonSeverity } from '../../../../shared/enums/button.enum';

@Component({
  selector: 'app-my-wallets-page',
  templateUrl: './my-wallets-page.component.html',
  styleUrl: './my-wallets-page.component.scss'
})
export class MyWalletsPageComponent {
  testItems: HorizontalTab[] = [
    { label: 'Test 2', routerLink: '/dashboard/my-wallets/test' },
    { label: 'Test 3', routerLink: '/dashboard/my-wallets/test3' }
  ];
  protected readonly ButtonSeverity = ButtonSeverity;
}
