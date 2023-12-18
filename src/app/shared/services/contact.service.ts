import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { ITestimonial } from '../models/testimonial';

// https://medium.com/javarevisited/sending-a-message-to-a-telegram-channel-the-easy-way-eb0a0b32968

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private sCharBR = '%0A';
  private apiToken = '5807116207:AAHAUD7P10-InYaWn_X4O3-Pdo6MsY5crq4';
  private chatId = '@BitAkashicoContact';

  constructor(
    private http: HttpClient
  ) { }

  sendTelegram(
    nickname: string,
    email: string,
    message: string,
    phone: string,
  ): Promise<any> {
    // Prepare params
    message = message.replace(/<[^>]*>/g, '').replace(/(\\r\\n)|([\r\n])/gmi, this.sCharBR);
    const text = `¡NUEVO MENSAJE desde BitAkashico! ${this.sCharBR}${this.sCharBR}
    - Nickname: ${nickname} ${this.sCharBR}
    - Email: ${email} ${this.sCharBR}
    - Phone: ${phone} ${this.sCharBR}
    - Message:${this.sCharBR} ${message} ${this.sCharBR}`;

    return this.doCall(text);
  }

  sendTestimonial(_testimonial: ITestimonial): Promise<any> {
    // Prepare params
    _testimonial.testimonial = _testimonial.testimonial.replace(/<[^>]*>/g, '').replace(/(\\r\\n)|([\r\n])/gmi, this.sCharBR);
    const text = `¡NUEVO TESTIMONIO desde BitAkashico! ${this.sCharBR}${this.sCharBR}
    - Side: ${_testimonial.side} ${this.sCharBR}
    - Anonymous: ${_testimonial.anon ? 'true' : 'false'} ${this.sCharBR}
    - Name: ${_testimonial.name} ${this.sCharBR}
    - Link: ${_testimonial.link} ${this.sCharBR}
    - Testimony:${this.sCharBR} ${_testimonial.testimonial} ${this.sCharBR}`;

    return this.doCall(text);
  }

  private doCall(text: string) {
    const path = `https://api.telegram.org/bot${this.apiToken}/sendMessage?chat_id=${this.chatId}&text=${text}`;

    // Do the call
    return new Promise<any>((resolve, reject) => {
      this.http.get<string>(path)
        .pipe(first())
        .subscribe({
          next: (response: any) => {
            resolve(response);
          },
          error: (error) => {
            // this.errorService.manageError(error);
            reject(error);
          },
        });
    });
  }
}
