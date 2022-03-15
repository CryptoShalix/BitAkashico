import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rank',
  templateUrl: './star-rank.component.html',
})
export class StarRankComponent {
  @Input() set setStars(stars: number) {
    this.stars = stars;
  }
  @Input() set setMaxStars(stars: number) {
    this.maxStars = stars;
  }

  maxStars: number;
  stars: number;

  constructor() { }
}
