import { Component, signal } from '@angular/core';
import { Dropdown as dropdown2 } from '../dropdown/dropdown';

@Component({
  selector: 'app-page',
  imports: [dropdown2],
  templateUrl: './page.html',
  styleUrl: './page.css'
})
export class Page {
  title = signal('Hola Mundo');

}
