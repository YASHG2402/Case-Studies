import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cal',
    templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
    @Input() num1: number;
    @Input() num2: number;
    
    resultAdd: number;
    resultMultiply: number;

    calculate() {
        this.resultAdd = this.num1 + this.num2;
        this.resultMultiply = this.num1 * this.num2;
    }
}