import { Component } from '@angular/core';
import { FadeIn as FadeInDirectiva } from '../../directives';



@Component({
  selector: 'app-fade-in',
  imports: [FadeInDirectiva],
  templateUrl: './fade-in.html',
  styleUrl: './fade-in.css'
})
export class FadeIn {

}
