import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  model,
  ModelSignal
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styleUrl: './collapsible-card.component.scss',
  imports: [NgClass],
  animations: [
    trigger('collapse', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: 0, paddingTop: 0, paddingBottom: 0 })),
      transition('expanded => collapsed', animate('200ms ease-out')),
      transition('collapsed => expanded', animate('200ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleCardComponent {
  title: InputSignal<string> = input('');
  isExpanded: ModelSignal<boolean> = model(false);

  toggleOpen() {
    this.isExpanded.update((isOpen: boolean) => !isOpen);
  }
}
