import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  input,
  InputSignal,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

interface TooltipPosition {
  left: number;
  top: number;
}

@Directive({ selector: '[tooltip]', standalone: true })
export class TooltipDirective implements OnDestroy {
  tooltip: InputSignal<string | undefined> = input<string | undefined>('');
  tooltipShowDelay: InputSignal<number> = input<number>(0);
  tooltipHideDelay: InputSignal<number> = input<number>(0);

  private componentRef: ComponentRef<any> | null = null;
  private showTimeout?: ReturnType<typeof setTimeout>;
  private hideTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private vcr: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    clearInterval(this.showTimeout);
    clearInterval(this.hideTimeout);

    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltip()) {
      this.initializeTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltip()) {
      this.setHideTooltipTimeout();
    }
  }

  private initializeTooltip(): void {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);

    if (this.componentRef == null) {
      this.createTooltip();
    }

    this.setTooltipPosition();
    this.setShowTooltipTimeout();
  }

  private calculateTooltipPosition(): TooltipPosition {
    const { left, right, top } =
      this.elementRef.nativeElement.getBoundingClientRect();

    return {
      left: Math.round((right - left) / 2 + left),
      top: Math.round(top)
    };
  }

  private createTooltip(): void {
    this.componentRef = this.vcr.createComponent(TooltipComponent);
    this.componentRef.setInput('tooltip', this.tooltip());
  }

  private setTooltipPosition(): void {
    if (!this.componentRef) {
      console.error('Tooltip component is not initialized!');
      return;
    }

    const { left, top } = this.calculateTooltipPosition();

    this.componentRef.setInput('left', left);
    this.componentRef.setInput('top', top);
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

  private setShowTooltipTimeout(): void {
    this.showTimeout = setTimeout((): void => {
      this.showTooltip();
      this.changeDetectorRef.markForCheck();
    }, this.tooltipShowDelay());
  }

  private setHideTooltipTimeout(): void {
    this.hideTimeout = setTimeout((): void => {
      this.hideTooltip();
      this.changeDetectorRef.markForCheck();
    }, this.tooltipHideDelay());
  }
}
