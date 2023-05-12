import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

import { CoreService } from '../../services/core.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup;

  submitMessage = '';

  minMessageLength = 10;

  constructor(
    private coreService: CoreService,
    private contactService: ContactService,
    private transalte: TranslateService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.builder.group({
      nickname: new FormControl('', [Validators.required]),
      email: new FormControl('', ([Validators.required])),
      phone: new FormControl(''),
      message: new FormControl('', [Validators.required])
    });
  }

  onSubmit(formData: any): void {
    try {
      const vNickname = formData.nickname;
      const vEmail = formData.email;
      const vPhone = formData.phone;
      const vMessage = formData.message;
      this.contactService.sendEmail(vNickname, vEmail, vMessage, vPhone);
      this.form.reset();
      this.submitMessage = this.transalte.instant('STRINGS.sendMsgSuccess');
      this.coreService.showSuccess(this.submitMessage);
    } catch (error) {
      console.error(error);
      this.submitMessage = this.transalte.instant('STRINGS.sendMsgError') + error;
      this.coreService.showError(this.submitMessage);
    }
  }
}
