import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  IMAGE_LOGO = IMAGES.HOME_IMG;
  nSideSelected = 0;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void { }

  toggleSelection(selection: number = 0) {
    this.nSideSelected = selection === this.nSideSelected ? 0 : selection;
  }

  onEnter() {
    this.storageService.setAppSide(this.nSideSelected);
  }
}
