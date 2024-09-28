import { Component, Input } from '@angular/core';
import { BaseInput } from '../base/base-input.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [DropdownModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent extends BaseInput {
  @Input({ required: true }) options!: unknown[];
  @Input() loading: boolean = false;
}
