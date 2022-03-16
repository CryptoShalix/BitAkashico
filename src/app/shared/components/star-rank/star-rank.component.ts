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
    this.initialize();
  }

  maxStars = 5;
  stars = 0;

  starsToPaint: string[];

  constructor() { }

  initialize(): void {
    this.starsToPaint = [];
    const stars = this.stars.toString().split('.');
    let starsFull = parseInt(stars[0], 10);
    let starsHalf = stars.length === 1 || parseInt(stars[1], 10) === 0 ? 0 : 1;
    let starsEmpty = this.maxStars - (starsFull + starsHalf);
    if (this.maxStars >= (starsFull + starsHalf)) {
      starsFull = this.maxStars;
      starsHalf = 0;
      starsEmpty = 0;
    }
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
