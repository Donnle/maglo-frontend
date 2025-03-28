import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/services/theme.service';
import { Dialog } from '@angular/cdk/dialog';
import { UpsertTransactionDialogComponent } from './shared/components/dialogs/upsert-transaction-dialog/upsert-transaction-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private dialog: Dialog
  ) {}

  onDialogTest() {
    this.dialog.open(UpsertTransactionDialogComponent, {
      data: {
        title: 'Test title'
      },
      width: '500px'
    });
  }

  ngOnInit() {
    this.themeService.initTheme();

    this.dialog.open(UpsertTransactionDialogComponent, {
      data: { title: 'Test' },
      width: '500px'
    });
  }
}
