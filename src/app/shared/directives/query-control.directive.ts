import {
  Directive,
  HostListener,
  input,
  InputSignal,
  OnInit,
  Optional
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgControl } from '@angular/forms';

/**
 * Use this directive when you need to pass value to query params
 *
 * Note: Works bad with [(ngModel)]
 */
@Directive({ selector: '[queryControl]', standalone: true })
export class QueryControlDirective implements OnInit {
  queryControl: InputSignal<string> = input.required<string>();
  queryEmitEvent: InputSignal<boolean> = input<boolean>(true);

  @HostListener('ngModelChange', ['$event'])
  onNgModelChange(rawValue: object | string): void {
    if (this.queryControl() == null) {
      console.error('Ng Model Change! Query is not defined!');
      return;
    }

    const queryParams: Params = this.activatedRoute.snapshot.queryParams;
    const value: string =
      typeof rawValue === 'object' ? JSON.stringify(rawValue) : rawValue;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...queryParams, [this.queryControl()]: value }
    });
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Optional() private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    if (this.ngControl == null || this.ngControl.control == null) {
      return;
    }

    const initialValue: string | undefined = this.getValueFromQuery(
      this.queryControl()
    );

    if (initialValue) {
      this.patchControlValue(initialValue);
    }
  }

  private getValueFromQuery(
    query: string | undefined,
    queryParams: Params = this.activatedRoute.snapshot.queryParams
  ): string | undefined {
    if (query == null) {
      console.error('Init Query! Query is not defined!');
      return undefined;
    }

    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.markAsTouched();
      this.ngControl.control.markAsDirty();
    }

    return queryParams[query];
  }

  private patchControlValue(value: string): void {
    if (value == null) {
      console.error('Value is not defined!');
      return;
    }

    if (this.ngControl == null || this.ngControl.control == null) {
      console.error("Control doesn't exist!");
      return;
    }

    try {
      this.ngControl.control.patchValue(JSON.parse(value), {
        emitEvent: this.queryEmitEvent()
      });
    } catch (e) {
      this.ngControl.control.patchValue(value, {
        emitEvent: this.queryEmitEvent()
      });
    }
  }
}
