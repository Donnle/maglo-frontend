import { ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { DialogConfiguration } from '../interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  open<T>(
    component: Type<T>,
    configuration: Partial<DialogConfiguration> = {}
  ) {
    this.componentFactoryResolver.resolveComponentFactory(component);
  }
}
