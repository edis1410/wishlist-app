import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, TranslocoModule],
})
export class LandingModule {}
