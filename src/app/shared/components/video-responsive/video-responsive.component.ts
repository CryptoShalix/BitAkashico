import { Component, Input } from '@angular/core';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-video',
  templateUrl: './video-responsive.component.html',
  styleUrls: ['./video-responsive.component.scss']
})
export class VideoResponsiveComponent {
  @Input() set setSource(source: string) {
    this.source = source;
  }
  @Input() set setTitle(title: string) {
    this.title = title;
  }

  source: string = 'https://www.youtube.com/@BitAkashico';
  title: string = '';

  constructor(
    private coreService: CoreService
  ) { }


  getVideoUrl(source: any) {
    if (this.coreService.isNullOrEmpty(source)) { return 'https://www.youtube.com/@BitAkashico'; }
    return 'https://www.youtube.com/embed/videoseries?list=' + source;
  }
}