import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  input,
  InputSignal,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { TooltipStyle } from '../enums/tooltip.enum';

@Directive({ selector: '[copyToClipboard]', standalone: true })
export class CopyToClipboardDirective implements OnDestroy {
  copyToClipboard: InputSignal<string> = input.required();
  copyToClipboardTooltipShow: InputSignal<boolean> = input(true);
  copyToClipboardTooltipShowDelay: InputSignal<number> = input(0);
  copyToClipboardTooltipHideDelay: InputSignal<number> = input(0);

  copyToClipboardTooltipText: InputSignal<string> = input('Click to Copy!');
  copyToClipboardTooltipSuccess: InputSignal<string> = input('Copied!');
  copyToClipboardTooltipHideAfterSuccessDelay: InputSignal<number> =
    input(1000);

  private componentRef: ComponentRef<TooltipComponent> | null = null;
  private showTimeouts: ReturnType<typeof setTimeout>[] = [];
  private hideTimeouts: ReturnType<typeof setTimeout>[] = [];

  @HostBinding('style.cursor') cursor: string = 'pointer';
  @HostListener('click', ['$event'])
  onClick(): void {
    this.clipboard.copy(this.copyToClipboard());

    if (this.copyToClipboardTooltipShow()) {
      this.initializeTooltip(
        this.copyToClipboardTooltipSuccess(),
        TooltipStyle.Success
      );
      this.setHideTooltipTimeout(
        this.copyToClipboardTooltipHideAfterSuccessDelay()
      );
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.copyToClipboardTooltipShow()) {
      this.initializeTooltip(this.copyToClipboardTooltipText());
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.copyToClipboardTooltipShow()) {
      this.setHideTooltipTimeout(this.copyToClipboardTooltipHideDelay());
    }
  }

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private vcr: ViewContainerRef,
    private clipboard: Clipboard,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  private initializeTooltip(
    tooltipText: string = this.copyToClipboardTooltipText(),
    tooltipStyle: TooltipStyle = TooltipStyle.Default
  ) {
    this.clearAllTimeouts();

    if (this.componentRef != null) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.createTooltip(tooltipText, tooltipStyle);
    this.setShowTooltipTimeout();
  }

  private createTooltip(
    tooltipText: string = this.copyToClipboardTooltipText(),
    tooltipStyle: TooltipStyle = TooltipStyle.Default
  ): void {
    const { left, right, top } =
      this.elementRef.nativeElement.getBoundingClientRect();

    this.componentRef = this.vcr.createComponent(TooltipComponent);

    this.componentRef.setInput('tooltip', tooltipText);
    this.componentRef.setInput('style', tooltipStyle);
    this.componentRef.setInput('left', Math.round((right - left) / 2 + left));
    this.componentRef.setInput('top', Math.round(top));
  }

  private showTooltip(): void {
    if (this.componentRef != null) {
      this.componentRef.setInput('visible', true);
    }
  }

  private hideTooltip(): void {
    if (this.componentRef != null) {
      this.componentRef.setInput('visible', false);
    }
  }

  private setShowTooltipTimeout(
    delay: number = this.copyToClipboardTooltipShowDelay()
  ): void {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.showTooltip();
      this.changeDetectorRef.markForCheck();
    }, delay);

    this.showTimeouts.push(timeout);
  }

  private setHideTooltipTimeout(
    delay: number = this.copyToClipboardTooltipHideDelay()
  ): void {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.hideTooltip();
      this.changeDetectorRef.markForCheck();
    }, delay);

    this.hideTimeouts.push(timeout);
  }

  private clearAllTimeouts(): void {
    this.showTimeouts.forEach((i) => clearTimeout(i));
    this.showTimeouts = [];

    this.hideTimeouts.forEach((i) => clearTimeout(i));
    this.hideTimeouts = [];
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private destroy(): void {
    this.clearAllTimeouts();

    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
