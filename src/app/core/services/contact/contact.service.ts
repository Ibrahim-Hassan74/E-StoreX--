import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  async sendMessage(data: ContactMessage): Promise<void> {
    try {
      await emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        {
          from_name: data.name,
          reply_to: data.email,
          subject: data.subject,
          message: data.message
        },
        {
          publicKey: environment.emailJs.publicKey,
        }
      );
    } catch (error) {
      console.error('EmailJS Error:', error);
      throw error;
    }
  }
}
