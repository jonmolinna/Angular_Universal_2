import { Component } from '@angular/core';
import { FadeInMore as FadeInMoreDirectiva } from '../../directives';


@Component({
  selector: 'app-fade-in-more',
  imports: [FadeInMoreDirectiva],
  templateUrl: './fade-in-more.html',
  styleUrl: './fade-in-more.css'
})
export class FadeInMore {

}
