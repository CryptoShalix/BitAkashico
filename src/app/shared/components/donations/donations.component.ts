import { Component, EventEmitter, Input, Output } from '@angular/core';
import { URLS } from '../../models/core';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent {
  @Input() set setShow(show: boolean) {
    this.showContainerDonations = show;
  }

  @Output() outOnClose = new EventEmitter<boolean>();

  PAY_IN_BTC = true;
  hasBeenCopied = false;
  showContainerDonations = false;

  // Copy text: https://www.geeksforgeeks.org/how-to-create-copy-to-clipboard-button/
  walletBTCLNZebedeeTag = URLS.ZEBEDEE_LNTAG;
  walletBTCLNZebedeeUrl = `${URLS.ZEBEDEE_LNURL}`;
  walletBTCLNZebedeeQR = `${URLS.ZEBEDEE_LNQR}`;
  walletBTCPaynymTag = `${URLS.PAYNYM}`;
  walletBTCPaynymText = `Paynym: ${this.walletBTCPaynymTag}`;
  walletPaypalQR = `${URLS.PAYPAL_QR}`;
  walletPaypalUrl = `${URLS.PAYPAL_URL}`;

  constructor(private coreService: CoreService) {
    this.PAY_IN_BTC = this.coreService.isAppSidebit();
  }

  onClickCopyToClipboard(): void {
    this.hasBeenCopied = true;
    const interval = setInterval(() => {
      this.hasBeenCopied = false;
      clearInterval(interval);
    }, 5000);
  }

  onClose() {
    this.showContainerDonations = false;
    this.outOnClose.emit(this.showContainerDonations);
  }

  getTitleText() {
    return this.PAY_IN_BTC ? 'DONATIONS.titleBit' : 'DONATIONS.titleFiat';
  }

  getTitleImage() {
    return this.PAY_IN_BTC ? 'bitcoin' : 'euro_symbol';
  }

  getCheckBoxText() {
    return this.PAY_IN_BTC ? 'DONATIONS.payInFiat' : 'DONATIONS.payInBTC';
  }

  getMessageText() {
    return this.PAY_IN_BTC ? 'DONATIONS.messageBit' : 'DONATIONS.messageFiat';
  }
}