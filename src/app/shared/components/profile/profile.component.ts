import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() fullName?: string = 'Mahfuzul Nabil';
  @Input() set avatar(avatar: string) {
    this._avatar = avatar;
  }

  _avatar: string = '';

  protected readonly PLACEHOLDER_AVATAR_PATH: string =
    './assets/icons/profile/avatar-placeholder.png';

  onDownloadImageError() {
    this._avatar = this.PLACEHOLDER_AVATAR_PATH;
    console.error(
      `Something went wrong while downloading profile image! ` +
        `New image path: ${this.PLACEHOLDER_AVATAR_PATH}!`
    );
  }
}
