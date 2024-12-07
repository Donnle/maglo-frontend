import {
  ComponentRef,
  Directive,
  input,
  InputSignal,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { SkeletonLoaderComponent } from '../components/skeleton-loader/skeleton-loader.component';

@Directive({ selector: '[skeleton]', standalone: true })
export class SkeletonDirective implements OnChanges {
  skeleton: InputSignal<boolean> = input(false);
  skeletonWidth: InputSignal<string> = input<string>(
    `${this.random(30, 90)}px`
  );
  skeletonHeight: InputSignal<string> = input<string>('16px'); // Default text height

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const isLoadingChange: SimpleChange = changes['skeleton'];

    if (isLoadingChange) {
      this.vcr.clear();

      if (isLoadingChange.currentValue) {
        const skeletonLoaderComponentRef: ComponentRef<SkeletonLoaderComponent> =
          this.vcr.createComponent(SkeletonLoaderComponent);

        Object.assign(skeletonLoaderComponentRef.instance, {
          width: this.skeletonWidth,
          height: this.skeletonHeight
        });
      } else {
        this.vcr.createEmbeddedView(this.tpl);
      }
    }
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
