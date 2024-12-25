import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal
} from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  protected readonly PLACEHOLDER_AVATAR_PATH: string =
    './assets/icons/profile/avatar-placeholder.png';

  fullName: InputSignal<string> = input<string>('Mahfuzul Nabil');
  avatar: InputSignal<string> = input(this.PLACEHOLDER_AVATAR_PATH, {
    transform: (avatar: string): string => {
      this._avatar = avatar;
      return avatar;
    }
  });

  _avatar: string = '';

  onDownloadImageError() {
    this._avatar = this.PLACEHOLDER_AVATAR_PATH;
    console.error(
      `Something went wrong while downloading profile image! ` +
        `New image path: ${this.PLACEHOLDER_AVATAR_PATH}!`
    );
  }
}
