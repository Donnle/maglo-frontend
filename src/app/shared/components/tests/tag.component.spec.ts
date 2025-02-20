import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from '../tag/tag.component';
import { NgClass } from '@angular/common';
import { TagSeverity } from '../../enums/tag.enum';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TagComponent', () => {
  let fixture: ComponentFixture<TagComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgClass]
    });

    fixture = TestBed.createComponent(TagComponent);
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should add button class according to input value', () => {
    fixture.componentRef.setInput('severity', TagSeverity.Success);
    fixture.detectChanges();

    const element: HTMLElement = debugElement.query(
      By.css('[data-testingId="tag"]')
    ).nativeElement;

    expect(element.classList).toContain(TagSeverity.Success);
  });
});
