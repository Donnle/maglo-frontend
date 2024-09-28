import { Component, Input } from '@angular/core';
import { BaseInput } from '../base/base-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

export enum InputIconPosition {
  Left = 'left',
  Right = 'right'
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends BaseInput {
  @Input() icon?: string;
  @Input() iconPosition: InputIconPosition = InputIconPosition.Left;
}
