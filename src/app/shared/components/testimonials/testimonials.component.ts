import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../services/core.service';
import { DBService } from '../../services/db.service';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '../../services/translate.service';

import { EInputType, FormItem, FormResponse, IFormItemButton, IFormItemField } from '../../models/core';
import { ITestimonial } from '../../models/testimonial';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  private IS_BIT_SIDE: boolean;
  private currentLanguage: string = '';

  testimonials: ITestimonial[] = [];
  formItem: FormItem;
  showTestimonialEditor = false;

  constructor(
    private translateService: TranslateService,
    private coreService: CoreService,
    private storageService: StorageService,
    private dbService: DBService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.coreService.getUserLanguage();
    this.storageService.appSide$.subscribe(() => {
      this.IS_BIT_SIDE = this.coreService.isAppSidebit();
      this.getTestimonials();
    });
    this.createForm();
  }

  private createForm() {
    // FIELDS
    const fields: IFormItemField[] = [];
    fields.push({
      inputType: EInputType.TEXT,
      name: 'name',
      label: 'TESTIMONIAL.inputNameLabel',
      placeholder: 'TESTIMONIAL.inputNamePlaceholder',
      icon: 'person',
      isRequired: true,
    });
    fields.push({
      inputType: EInputType.CHECK,
      name: 'anon',
      label: 'TESTIMONIAL.inputAnonLabel',
      placeholder: '',
      helpMessage: 'TESTIMONIAL.inputAnonHelp',
      icon: 'perm_identity',
    });
    fields.push({
      inputType: EInputType.TEXT,
      name: 'url',
      label: 'TESTIMONIAL.inputUrlLabel',
      placeholder: 'TESTIMONIAL.inputUrlPlaceholder',
      helpMessage: 'TESTIMONIAL.inputUrlHelp',
      icon: 'share',
    });
    fields.push({
      inputType: EInputType.TEXTAREA,
      name: 'testimony',
      label: 'TESTIMONIAL.inputTestimonyLabel',
      placeholder: 'TESTIMONIAL.inputTestimonyPlaceholder',
      icon: 'message',
      helpMessage: 'TESTIMONIAL.msgWarning',
      isRequired: true,
      minLength: 30,
    });

    // BUTTONS
    const buttons: IFormItemButton[] = [];
    buttons.push({
      text: 'BUTTONS.send',
      icon: 'check',
      isSubmit: true
    });

    this.formItem = { fields: fields, buttons: buttons };
  }

  private async getTestimonials() {
    this.testimonials = await this.dbService.getTestimonials();
  }

  getAkademyTestimonialsTextTitle() {
    return 'TESTIMONIAL.title';
  }

  getAkademyTestimonialsText() {
    return 'TESTIMONIAL.about';
  }

  getTestimonialByLanguage(_testimonial: ITestimonial) {
    return _testimonial.testimonial[this.currentLanguage];
  }

  async onSubmit(formResponse: FormResponse) {
    try {
      const formData = formResponse.data;
      const testimonial: ITestimonial = {
        side: this.IS_BIT_SIDE ? 'bit' : 'aka',
        name: formData.name,
        link: formData.url,
        anon: formData.anon,
        testimonial: formData.testimony
      };
      if (await this.dbService.saveTestimonial(testimonial)) {
        formResponse.form.reset();
        this.showTestimonialEditor = false;
        const submitMessage = this.translateService.instant('STRINGS.saveMsgSuccess');
        this.coreService.showSuccess(submitMessage);
      } else {
        const submitMessage = this.translateService.instant('STRINGS.saveMsgError');
        this.coreService.showAlert(submitMessage);
      }
    } catch (error) {
      console.error(error);
      const submitMessage = this.translateService.instant('STRINGS.saveMsgError') + error;
      this.coreService.showError(submitMessage);
    }
  }
}