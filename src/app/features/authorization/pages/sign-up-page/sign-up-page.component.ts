import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent implements OnInit {
  signUpForm!: FormGroup;

  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonSize = ButtonSize;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSignUpForm();
  }

  onSubmit() {
    console.log('Submit');
  }

  private initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
