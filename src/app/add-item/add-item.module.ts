import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item.component';
import { AddItemRoutingModule } from './add-item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [AddItemComponent],
  imports: [CommonModule, AddItemRoutingModule, ReactiveFormsModule, TranslocoModule],
})
export class AddItemModule {}
