import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-help-page',
  standalone: false,
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpPageComponent {
  FAQs = [
    {
      id: 1,
      question: 'How do I add a new transaction?',
      answer:
        'Go to the Dashboard or Transactions tab, click the “+” button, fill out the form, and click “Add.”',
      isExpanded: false
    },
    {
      id: 2,
      question: 'How do I delete a transaction?',
      answer:
        'Open the transaction details and click “Delete.” Confirm the action when prompted.',
      isExpanded: false
    },
    {
      id: 3,
      question: 'What is the difference between income and expense?',
      answer: 'Expenses subtract money from your wallet, while income adds it.',
      isExpanded: false
    },
    {
      id: 4,
      question: 'Can I create wallets in different currencies?',
      answer: 'Yes, Maglo supports multiple currencies like USD, EUR, and UAH.',
      isExpanded: false
    },
    {
      id: 5,
      question: 'How do I create an invoice?',
      answer:
        'Go to the “Invoices” tab, click “Create Invoice,” fill in the details, and hit “Send.”',
      isExpanded: false
    },
    {
      id: 6,
      question: 'Are my financial records safe?',
      answer:
        'Yes. All financial data is encrypted and securely stored on our servers.',
      isExpanded: false
    },
    {
      id: 7,
      question: 'How can I get spending advice?',
      answer:
        'Enable the AI Advisor on the dashboard to receive personalized financial suggestions.',
      isExpanded: false
    },
    {
      id: 8,
      question: 'Can Maglo track my subscriptions automatically?',
      answer:
        'Yes, add your subscriptions, and Maglo will auto-log them on the scheduled date.',
      isExpanded: false
    },
    {
      id: 9,
      question: 'How do I change the language or default currency?',
      answer:
        'You can adjust both in the Settings section under “Preferences.”',
      isExpanded: false
    },
    {
      id: 10,
      question: 'Can I use Maglo for free?',
      answer:
        'Yes. The core features are free. A paid plan unlocks advanced tools and analytics.',
      isExpanded: false
    }
  ];

  onFaqExpandedChange(faqId: number, isExpanded: boolean): void {
    this.FAQs = this.FAQs.map((faq: any) => {
      return { ...faq, isExpanded: faq.id === faqId ? isExpanded : false };
    });
  }
}
