import 'zone.js';
import { ButtonComponent } from '../button/button.component';
import { NgClass } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgClass, SpinnerComponent]
    });

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should show button', () => {
    expect(component).not.toBeNull();
  });

  describe('Loader should show properly', () => {
    it('should show loader', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const loader = debugElement.query(By.css('[data-testingId="loader"]'));
      expect(loader).not.toBeNull();
    });

    it('should NOT show loader', () => {
      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      const loader = debugElement.query(By.css('[data-testingId="loader"]'));
      expect(loader).toBeNull();
    });
  });

  describe('Button should show icon properly', () => {
    it('should show icon', () => {
      fixture.componentRef.setInput('icon', 'test-icon');
      fixture.detectChanges();

      const icon = debugElement.query(By.css('[data-testingId="icon"]'));
      expect(icon).not.toBeNull();
    });

    it('should NOT show icon', () => {
      fixture.componentRef.setInput('icon', undefined);
      fixture.detectChanges();

      const icon = debugElement.query(By.css('[data-testingId="icon"]'));
      expect(icon).toBeNull();
    });
  });

  describe('Button should show icon with content properly', () => {
    it('should show icon with text', () => {
      fixture.componentRef.setInput('icon', 'test-icon');
      fixture.detectChanges();

      const icon = debugElement.query(By.css('[data-testingId="icon"]'));
      const content = debugElement.query(By.css('[data-testingId="content"]'));

      expect(icon).not.toBeNull();
      expect(content).not.toBeNull();
    });
  });
});
