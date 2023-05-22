import { Component, Input } from '@angular/core';
import { URLS } from '../../models/core';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent {
  @Input() set setShow(show: boolean) {
    this.showContainerDonations = show;
  }

  hasBeenCopied = false;
  showContainerDonations = false;

  // Copy text: https://www.geeksforgeeks.org/how-to-create-copy-to-clipboard-button/
  walletBTCLNZebedeeTag = URLS.ZEBEDEE_LNTAG;
  walletBTCLNZebedeeUrl = `${URLS.ZEBEDEE_LNURL}`;
  walletBTCLNZebedeeQR = `${URLS.ZEBEDEE_LNQR}`;
  walletBTCPaynymTag = `${URLS.PAYNYM}`;
  walletBTCPaynymText = `Paynym: ${this.walletBTCPaynymTag}`;

  constructor() { }

  onClickCopyToClipboard(): void {
    this.hasBeenCopied = true;
    const interval = setInterval(() => {
      this.hasBeenCopied = false;
      clearInterval(interval);
    }, 5000);
  }
}