import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wobble',
  imports: [],
  templateUrl: './wobble.html',
  styleUrl: './wobble.css'
})
export class Wobble {
  @Input({required: true}) image!: string;
  @Input({required: true}) name!: string;

}
