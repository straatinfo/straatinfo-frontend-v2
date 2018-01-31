import { Component, Input, forwardRef, AfterViewInit, trigger, state, animate, transition, style, HostListener, OnChanges, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputBasicComponent),
  multi: true
};

@Component({
  selector: 'app-input-basic',
  templateUrl: './input-basic.component.html',
  styleUrls: ['./input-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputBasicComponent implements OnInit {

  // Input field type eg:text,password
  @Input() type;

  @Input() length;

  // ID attribute for the field and for attribute for the label
  @Input() idd;

  // The field name text . used to set placeholder also if no pH (placeholder) input is given
  @Input() text;

  // placeholder input
  @Input() pH: string;

  //current form control input. helpful in validating and accessing form control
  @Input() c: FormControl = new FormControl();

  // set true if we need not show the asterisk in red color
  @Input() optional: boolean = false;

  //@Input() v:boolean = true; // validation input. if false we will not show error message.

  // errors for the form control will be stored in this array
  errors: Array<any> = [];

  // get reference to the input element
  @ViewChild('input') inputRef: ElementRef;


  constructor() {

  }

  ngOnChanges() {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.pH === undefined) {
      this.pH = this.text;
    }

    // RESET the custom input form control UI when the form control is RESET
    this.c.valueChanges.subscribe(
      () => {
        // check condition if the form control is RESET
        if (this.c.value == "" || this.c.value == null || this.c.value == undefined) {
          this.innerValue = "";
          this.inputRef.nativeElement.value = "";
        }
      }
    );
    
  }

  //Lifecycle hook. angular.io for more info
  ngAfterViewInit() {
    // set placeholder default value when no input given to pH property      
    
  }

  //The internal data model for form control value access
  private innerValue: any = '';

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(e: Event, value: any) {
    //set changed value
    this.innerValue = value;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);

    //reset errors 
    this.errors = [];
    //setting, resetting error messages into an array (to loop) and adding the validation messages to show below the field area
    for (var key in this.c.errors) {
      if (this.c.errors.hasOwnProperty(key)) {
        if (key === "required") {
          this.text = this.pH + " is " + "Required";
        } else if (key === "email") {
          this.text = this.pH + " is " + "Required";
        } else {
          this.text = this.pH + " is " + "Required";
        }
      }
    }
  }



  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  //propagate changes into the custom form control
  propagateChange = (_: any) => { }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.innerValue = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {

  }

}
