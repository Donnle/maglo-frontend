import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { CollapsibleCardComponent } from '../../shared/components/collapsible-card/collapsible-card.component';


@NgModule({
  declarations: [HelpPageComponent],
  imports: [CommonModule, HelpRoutingModule, CollapsibleCardComponent]
})
export class HelpModule {}
