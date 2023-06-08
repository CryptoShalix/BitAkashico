import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {
  @ContentChild('modal_dialog_template', { static: false }) modal_dialog_template: TemplateRef<any>;

  @Input() set setShow(show: boolean) {
    this.showModalDialog = show;
  }
  @Input() set setTitle(title: string) {
    this.title = title;
  }

  @Input() set setTitleImage(titleImage: string) {
    this.isBitcoinImage = titleImage === 'bitcoin';
    this.titleImage = this.isBitcoinImage ? '₿' : titleImage;
  }

  @Output() outOnClose = new EventEmitter<boolean>();

  isBitcoinImage = false;
  showModalDialog = false;
  title: string;
  titleImage: string;

  onClose() {
    this.showModalDialog = false;
    this.outOnClose.emit(this.showModalDialog);
  }
}