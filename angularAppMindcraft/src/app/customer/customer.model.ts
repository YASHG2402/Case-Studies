import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

export class Customer {
    id : String;
    CustomerName : string;
    Amount : number

    formCustomerGroup: FormGroup; // create obkect of FormGroup

    constructor() {
        var _builder = new FormBuilder();
        this.formCustomerGroup = _builder.group({});  // Use the builder to create control & validation

        this.formCustomerGroup.addControl("CustomerNameControl",new FormControl('',Validators.required) );

        // Customer Id control --> 2 validations (required 4 letter numeric)
        var validationCollection = [];
        validationCollection.push(Validators.required);
        validationCollection.push(Validators.pattern("^[0-9]{4,4}$"));

        this.formCustomerGroup.addControl("CustomerIdControl",new FormControl('',Validators.compose(validationCollection)));

        // No validation for amount
    }
}

