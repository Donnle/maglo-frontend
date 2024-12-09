import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/enums/button.enum';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpPageComponent implements OnInit {
  signUpForm!: FormGroup;

  protected readonly ButtonSeverity: typeof ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize: typeof ButtonSize = ButtonSize;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSignUpForm();
  }

  onSubmit() {
    console.log('Submit');
  }

  private initSignUpForm(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
