import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../shared/services/core.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { ContactService } from 'src/app/shared/services/contact.service';

import { EInputType, FormItem, FormResponse, IFormItemButton, IFormItemField } from 'src/app/shared/models/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent implements OnInit {
  private IS_BIT_SIDE = true;
  TITLE_TEXT = 'MENU.contact';

  formItem: FormItem;

  constructor(
    private translateService: TranslateService,
    private coreService: CoreService,
    private storageService: StorageService,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(() => {
      this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    });
    this.createForm();
  }

  private createForm() {
    // FIELDS
    const fields: IFormItemField[] = [];
    fields.push({
      inputType: EInputType.TEXT,
      name: 'nickname',
      label: 'PAGES.CONTACT.nickname',
      placeholder: 'Bob | Bob_2140',
      icon: 'person',
      isRequired: true,
    });
    fields.push({
      inputType: EInputType.EMAIL,
      name: 'email',
      label: 'PAGES.CONTACT.email',
      placeholder: 'email@domain.com',
      icon: 'email',
      isRequired: true,
      helpMessage: 'PAGES.CONTACT.emailHelp'
    });
    fields.push({
      inputType: EInputType.TEXT,
      name: 'phone',
      label: 'PAGES.CONTACT.phone',
      placeholder: '+34 111 222 333 / @telegram_id',
      icon: 'phone',
    });
    fields.push({
      inputType: EInputType.TEXTAREA,
      name: 'message',
      label: 'PAGES.CONTACT.message',
      placeholder: 'PAGES.CONTACT.messageHint',
      icon: 'message',
      isRequired: true,
      minLength: 10,
    });

    // BUTTONS
    const buttons: IFormItemButton[] = [];
    buttons.push({
      text: 'PAGES.CONTACT.submit',
      icon: 'telegram',
      isSubmit: true
    });

    this.formItem = { fields: fields, buttons: buttons };
  }

  getAboutText() {
    return this.IS_BIT_SIDE ? 'PAGES.CONTACT.aboutBit' : 'PAGES.CONTACT.aboutAka';
  }

  onSubmit(formResponse: FormResponse): void {
    try {
      const formData = formResponse.data;
      const vNickname = formData.nickname;
      const vEmail = formData.email;
      const vPhone = formData.phone;
      const vMessage = formData.message;
      this.contactService.sendTelegram(vNickname, vEmail, vMessage, vPhone);
      formResponse.form.reset();
      const submitMessage = this.translateService.instant('STRINGS.sendMsgSuccess');
      this.coreService.showSuccess(submitMessage);
    } catch (error) {
      console.error(error);
      const submitMessage = this.translateService.instant('STRINGS.sendMsgError') + error;
      this.coreService.showError(submitMessage);
    }
  }
}
