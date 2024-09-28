import { Component, OnInit } from '@angular/core';
import {
  ButtonSeverity,
  ButtonSize
} from '../../../../shared/components/button/button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent implements OnInit {
  signInForm!: FormGroup;

  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonSeverity = ButtonSeverity;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSignInForm();
  }

  private initSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      short_remember: [false]
    });
  }
}
