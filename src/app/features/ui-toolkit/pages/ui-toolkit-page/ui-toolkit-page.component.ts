import { Component } from '@angular/core';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/components/button/button.component';
import { FormControl } from '@angular/forms';
import { InputIconPosition } from '../../../../shared/components/controllers/input/input.component';
import { TagSeverity } from '../../../../shared/components/tag/tag.component';

@Component({
  selector: 'app-ui-toolkit-page',
  templateUrl: './ui-toolkit-page.component.html',
  styleUrl: './ui-toolkit-page.component.scss'
})
export class UiToolkitPageComponent {
  control = new FormControl();

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly InputIconPosition = InputIconPosition;
  protected readonly TagSeverity = TagSeverity;
}
