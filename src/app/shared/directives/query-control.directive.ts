import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgControl } from '@angular/forms';

/** Use this directive when you need to pass value to query params */
@Directive({
  selector: '[queryControl]',
  standalone: true
})
export class QueryControlDirective implements OnInit {
  @Input({ required: true }) query!: string | undefined;

  @HostListener('ngModelChange', ['$event'])
  onNgModelChange(rawValue: object | string): void {
    if (this.query == null) {
      console.error('Ng Model Change! Query is not defined!');
      return;
    }

    const queryParams: Params = this.activatedRoute.snapshot.queryParams;
    const value: string =
      typeof rawValue === 'object' ? JSON.stringify(rawValue) : rawValue;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...queryParams, [this.query]: value }
    });
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngControl: NgControl
  ) {}

  ngOnInit() {
    const initialValue: string | undefined = this.getValueFromQuery(this.query);
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

    this.ngControl.control?.markAsTouched();
    this.ngControl.control?.markAsDirty();
    return queryParams[query];
  }

  private patchControlValue(value: string) {
    if (value == null) {
      console.error('Value is not defined!');
      return;
    }

    if (!this.ngControl.control) {
      console.error("Control doesn't exist!");
      return;
    }

    try {
      this.ngControl.control.patchValue(JSON.parse(value));
    } catch (e) {
      this.ngControl.control.patchValue(value);
    }
  }
}
