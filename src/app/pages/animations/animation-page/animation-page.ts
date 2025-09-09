import { Component } from '@angular/core';
import { Wobble } from '../component/wobble/wobble';
import { FadeIn } from '../component/fade-in/fade-in';
import { FadeInMore } from '../component/fade-in-more/fade-in-more';
import { Wobble as WobbleDirective } from "../directives";

interface WOBBLE {
  name: string;
  image: string;
}

@Component({
  selector: 'app-animation-page',
  imports: [Wobble, WobbleDirective, FadeIn, FadeInMore],
  templateUrl: './animation-page.html',
})
export class AnimationPage {
  wobbles: Array<WOBBLE> = [
    {
      name: 'Imagen 1',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    },
    {
      name: 'Imagen 2',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    },
    {
      name: 'Imagen 3',
      image: 'https://images.pexels.com/photos/16714108/pexels-photo-16714108.jpeg',
    },
  ];
}
