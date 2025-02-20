import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/enums/button.enum';
import { InputIconPosition } from '../../../../shared/enums/input.enum';
import { TagSeverity } from '../../../../shared/enums/tag.enum';

@Component({
  selector: 'app-ui-toolkit-page',
  templateUrl: './ui-toolkit-page.component.html',
  styleUrl: './ui-toolkit-page.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiToolkitPageComponent {
  control4 = new FormControl([]);
  control3 = new FormControl();
  control2 = new FormControl(1);
  control = new FormControl();
  dateControl = new FormControl();

  protected readonly ButtonSize: typeof ButtonSize = ButtonSize;
  protected readonly ButtonSeverity: typeof ButtonSeverity = ButtonSeverity;
  protected readonly InputIconPosition: typeof InputIconPosition =
    InputIconPosition;
  protected readonly TagSeverity: typeof TagSeverity = TagSeverity;
}
