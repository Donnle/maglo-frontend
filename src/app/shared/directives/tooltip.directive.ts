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

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  tooltip: InputSignal<string> = input('');
  tooltipShowDelay: InputSignal<number> = input(0);
  tooltipHideDelay: InputSignal<number> = input(0);

  private componentRef: ComponentRef<any> | null = null;
  private showTimeout?: ReturnType<typeof setTimeout>;
  private hideTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private vcr: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.initializeTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setHideTooltipTimeout();
  }

  private initializeTooltip() {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);

    if (this.componentRef != null) {
      this.setShowTooltipTimeout();
      return;
    }

    this.createTooltip();
    this.setShowTooltipTimeout();
  }

  private createTooltip() {
    const { left, right, top } =
      this.elementRef.nativeElement.getBoundingClientRect();

    this.componentRef = this.vcr.createComponent(TooltipComponent);

    this.componentRef.instance.tooltip = this.tooltip();
    this.componentRef.instance.left = Math.round((right - left) / 2 + left);
    this.componentRef.instance.top = Math.round(top);
  }

  private showTooltip() {
    if (this.componentRef != null) {
      this.componentRef.instance.visible = true;
    }
  }

  private hideTooltip() {
    if (this.componentRef != null) {
      this.componentRef.instance.visible = false;
    }
  }

  private setShowTooltipTimeout() {
    this.showTimeout = setTimeout(() => {
      this.showTooltip();
      this.changeDetectorRef.detectChanges();
    }, this.tooltipShowDelay());
  }

  private setHideTooltipTimeout() {
    this.hideTimeout = setTimeout(() => {
      this.hideTooltip();
      this.changeDetectorRef.detectChanges();
    }, this.tooltipHideDelay());
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  private destroy(): void {
    clearInterval(this.showTimeout);
    clearInterval(this.hideTimeout);

    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
