import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { CoreService } from '../../services/core.service';

import { EInputType, FormItem, FormResponse, IFormItemButton, IFormItemField } from '../../models/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  @Input() set sFormItem(_formItem: FormItem) {
    this.fields = _formItem.fields;
    this.buttons = _formItem.buttons;
  }

  @Output() outOnSubmit = new EventEmitter<FormResponse>();
  @Output() outOnCancel = new EventEmitter<boolean>();

  fields: IFormItemField[];
  buttons: IFormItemButton[];

  email = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup;

  submitMessage = '';

  minMessageLength = 10;

  constructor(
    private coreService: CoreService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup({});

    this.fields.forEach(field => {
      let validators: ValidatorFn[] = [];
      if (field.isRequired) {
        validators.push(Validators.required);
      }
      if (field.inputType === EInputType.EMAIL) {
        validators.push(Validators.email);
      }
      if (field.minLength !== undefined && field.minLength > 0) {
        validators.push(Validators.minLength(field.minLength));
      }
      this.form.addControl(field.name, new FormControl('', validators));
    });
  }

  onSubmit(formData: FormData): void {
    this.outOnSubmit.emit({ form: this.form, data: formData });
  }

  onClicked() {
    this.form.reset();
    this.outOnCancel.emit(true);
  }

  isNullOrEmpty(val: any) {
    return this.coreService.isNullOrEmpty(val);
  }
}
