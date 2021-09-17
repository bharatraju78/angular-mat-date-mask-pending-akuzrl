import {
  Component,
  OnInit,
  Input,
  Output,
  forwardRef,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerOverviewExample),
  multi: true,
};

const noop = () => {};

/** @title Basic datepicker */
@Component({
  selector: 'datepicker-overview-example',
  templateUrl: 'datepicker-overview-example.html',
  styleUrls: ['datepicker-overview-example.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class DatepickerOverviewExample implements ControlValueAccessor {
  public mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  };

  innerValue: Date = new Date();
  hide: boolean = true;
  dateMasked: string =
    '**/**/' +
    this.innerValue.toLocaleString().split(',', 2)[0].split('/', 3)[2];

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): Date {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: Date) {
    if (v !== this.innerValue) {
      // alert('set value');
      this.innerValue = v;
    }
  }
  //Occured value changed from module
  writeValue(value: any): void {
    if (value !== this.innerValue) {
      // alert('writeValue');
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  onChange(event) {
    // console.log(event);
    this.value = event;
    this.hide = false;
    this.dateMasked =
      '**/**/' + this.value.toLocaleString().split(',', 2)[0].split('/', 3)[2];
    this.onBlur();
  }

  todate(value) {
    this.value = new Date(value);
  }

  onBlur() {
    this.onChangeCallback(this.innerValue);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
