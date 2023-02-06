import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  constructor(
    private coreService: CoreService
  ) { }
}
