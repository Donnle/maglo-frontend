import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ButtonSeverity,
  ButtonSize,
  ButtonType
} from '../../../../shared/enums/button.enum';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent implements OnInit {
  signInForm!: FormGroup;

  protected readonly ButtonSize: typeof ButtonSize = ButtonSize;
  protected readonly ButtonSeverity: typeof ButtonSeverity = ButtonSeverity;
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSignInForm();
  }

  onSubmit() {
    console.log('Submit');
  }

  private initSignInForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      short_remember: [false]
    });
  }
}
