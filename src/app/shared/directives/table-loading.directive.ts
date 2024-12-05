import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[tableLoading]',
  standalone: true
})
export class TableLoadingDirective implements OnChanges {
  @Input({ required: true }) tableLoading: boolean = false;

  private loaderRow!: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const tableLoading: SimpleChange = changes['tableLoading'];

    if (tableLoading && tableLoading.firstChange) {
      this.initLoaderRow();
    }

    if (tableLoading && tableLoading.currentValue != null) {
      this.toggleLoadingShow(tableLoading.currentValue);
    }
  }

  private toggleLoadingShow(isLoading: boolean = false) {
    const tableBody: unknown =
      this.elementRef?.nativeElement?.querySelector('tbody');

    if (!tableBody || this.loaderRow == null) {
      return;
    }

    if (isLoading && this.renderer) {
      this.renderer.appendChild(tableBody, this.loaderRow);
    } else {
      this.renderer.removeChild(tableBody, this.loaderRow);
    }
  }

  private initLoaderRow(): void {
    // Create Loading Row
    this.loaderRow = this.renderer.createElement('tr');
    const loaderCell: unknown = this.renderer.createElement('td');

    const countColumns: string = String(this.getCountColumns());
    this.renderer.setAttribute(loaderCell, 'colspan', countColumns);

    // Create Div For Loader
    const loaderDiv: unknown = this.renderer.createElement('div');
    this.renderer.addClass(loaderDiv, 'table-loader');
    this.renderer.setStyle(loaderDiv, 'text-align', 'center');
    this.renderer.setStyle(loaderDiv, 'padding', '20px');

    // Create Loading Text
    const loadingText: unknown = this.renderer.createText('Loading...');
    this.renderer.appendChild(loaderDiv, loadingText);
    this.renderer.appendChild(loaderCell, loaderDiv);
    this.renderer.appendChild(this.loaderRow, loaderCell);
  }

  private getCountColumns(): number {
    const tableHeader = this.elementRef.nativeElement.querySelector('thead');
    if (!tableHeader) {
      return 1; // Default to 1 if there's no header
    }

    const firstRow = tableHeader.querySelector('tr');
    return firstRow ? firstRow.children.length : 1;
  }
}
