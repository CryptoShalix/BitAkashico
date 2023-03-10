import { Component, OnInit } from '@angular/core';
import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-academy-page',
  templateUrl: './academy-page.component.html',
  styleUrls: ['./academy-page.component.scss']
})
export class AcademyPageComponent implements OnInit {
  LOGO_AKASHICO = IMAGES.LOGO_AKASHICO;

  constructor() { }

  ngOnInit(): void { }
}
