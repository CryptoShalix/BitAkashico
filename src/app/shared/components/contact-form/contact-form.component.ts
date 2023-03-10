import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup;

  minMessageLength = 10;

  constructor(
    private coreService: CoreService,
    private contactService: ContactService,
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
    console.log(formData);
    const vNickname = formData.nickname;
    const vEmail = formData.email;
    const vPhone = formData.phone;
    const vMessage = formData.message;
    this.contactService.sendEmail(vNickname, vEmail, vMessage, vPhone);
  }
}
