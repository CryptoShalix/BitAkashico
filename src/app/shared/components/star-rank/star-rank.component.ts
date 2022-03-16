import { Component, Input } from '@angular/core';

export enum EStarRank {
  STAR = 'star',
  STAR_EMPTY = 'star_border',
  STAR_HALF = 'star_half',
}

// https://github.com/riteshgandhi/ng-star-rating

@Component({
  selector: 'app-star-rank',
  templateUrl: './star-rank.component.html',
  styleUrls: ['./star-rank.component.scss']
})
export class StarRankComponent {
  @Input() set setStars(stars: number) {
    this.stars = stars;
  }

  maxStars = 5;
  stars = 0;

  starsToPaint: string[];

  constructor() {
    this.starsToPaint = [];
    console.log(this.stars);
    const stars = this.stars.toString().split('.');
    console.log(stars);
    const starsFull = parseInt(stars[0], 10);
    const starsHalf = parseInt(stars[1], 10) === 0 ? 0 : 1;
    const starsEmpty = this.maxStars - (starsFull + starsHalf);
    console.log(starsFull);
    console.log(starsHalf);
    console.log(starsEmpty);
    this.addStarToList(starsFull, EStarRank.STAR);
    this.addStarToList(starsHalf, EStarRank.STAR_HALF);
    this.addStarToList(starsEmpty, EStarRank.STAR_EMPTY);
  }

  private addStarToList(numOfStars: number, starType: EStarRank): void {
    for (let index = 0; index < numOfStars; index++) {
      this.starsToPaint.push(starType);
    }
  }
}
