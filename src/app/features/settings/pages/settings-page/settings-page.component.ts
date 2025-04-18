import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonType
} from '../../../../shared/enums/button.enum';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: false,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit {
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonType = ButtonType;

  settingsForm!: FormGroup;
  isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initSettingsForm();
  }

  onPersonalInfoSubmit() {
    console.log('Submit', this.settingsForm.value);
  }

  private initSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      firstName: ['', []],
      lastName: ['', []],
      birthday: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      password: ['', []],
      confirmPassword: ['', []]
    });
  }
}
