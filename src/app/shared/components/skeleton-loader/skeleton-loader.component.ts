import { Component, input, InputSignal } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
  width: InputSignal<string> = input('100px');
  height: InputSignal<string> = input('20px');
  borderRadius: InputSignal<string> = input('7px');
}
