import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'

const ReactiveComponents = [
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule
];

@NgModule({
  imports: [ReactiveComponents],
  exports: [ReactiveComponents]
})
export class ReactiveModule { }
