import { Component } from '@angular/core';
import { fadeAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title: string = 'Hello Yash, from Angular.';
  count: number = 100;
}

