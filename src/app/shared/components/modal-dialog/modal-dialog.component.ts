import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

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

  showModalDialog = false;
  title: string;
}