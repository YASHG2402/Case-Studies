import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamicformarray',
  templateUrl: './dynamicformarray.component.html',
  styleUrls: ['./dynamicformarray.component.css']
})
export class DynamicformarrayComponent {

  myForm: FormGroup;  //declare a FormGroup
  educationList: any = [];

  //FormGroup controls validation 
  validation_message = {
    first_name: [{ type: 'required', message: 'First Name is required' }],
    last_name: [{ type: 'required', message: 'Last Name is required' }],
    email: [{ type: 'required', message: 'Email is required' }],
    phone_no: [{ type: 'required', message: 'Mobile number is required' }],
  };

  //FormArray controls validation
  validation_edumessage = {
    schoolName: [{ type: 'required', message: 'School Name is required' }],
    degree: [{ type: 'required', message: 'Degree is required' }]
  };

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    //build FormGroup
    this.myForm = this.fb.group({
      first_name: new FormControl('', [Validators.required]),     
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone_no: new FormControl('', [Validators.required]),
   
      educationdata: this.fb.array([]) // add FormArray,
    });
  }

  //getter for forcontrols used by UI-HTML
  get formControls() {
    return this.myForm.controls;
  }

  //#region  EDUCATION DATA

  //FormArray  -  used in html line no 103 - *ngFor="let f ...
  educationdata(): FormArray {
    return this.myForm.get('educationdata') as FormArray;
  }

  //educational data form group control
  neweducationdata(): FormGroup {
    return this.fb.group({
      schoolName: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      fieldofstudy: new FormControl(''),
      startDt: new FormControl(''),
      endDt: new FormControl(''),
      grade: new FormControl('')
    });
  }

  //call in validation of eduction form
  educationcon(index) {
    this.educationList = this.myForm.get('educationdata') as FormArray;
    const formGroup = this.educationList.controls[index] as FormGroup;
    return formGroup;
  }
  //add button click
  addeducationdata() {
    this.educationdata().push(this.neweducationdata());
  }

  //remove button click
  removeeducationdata(i: number) {
    this.educationdata().removeAt(i);
  }
  //#endregion

  //form submit
  onSubmit() {
    console.log(this.myForm.value)
  }


}
