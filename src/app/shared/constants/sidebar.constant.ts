import { VerticalTab } from '../interfaces/vertical-tab.interface';

export const TOP_SIDEBAR: VerticalTab[] = [
  {
    label: 'Dashboard',
    icon: 'icon icon-home',
    routerLink: '/dashboard/main'
  },
  {
    label: 'Transactions',
    icon: 'icon icon-transactions',
    routerLink: '/dashboard/transactions'
  },
  {
    label: 'Invoices',
    icon: 'icon icon-invoices',
    routerLink: '/dashboard/invoices'
  },
  {
    label: 'My Wallets',
    icon: 'icon icon-wallet-open',
    routerLink: '/dashboard/wallets'
  },
  {
    label: 'Settings',
    icon: 'icon icon-settings',
    routerLink: '/dashboard/settings'
  }
];

export const BOTTOM_SIDEBAR: VerticalTab[] = [
  {
    label: 'Help',
    icon: 'icon icon-help',
    routerLink: ['/dashboard/help']
  }
];
