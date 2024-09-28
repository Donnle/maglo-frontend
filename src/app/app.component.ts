import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InputNumberModule,
    Button,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
