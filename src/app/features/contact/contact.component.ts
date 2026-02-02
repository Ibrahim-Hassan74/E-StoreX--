import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ContactService, ContactMessage } from '../../core/services/contact/contact.service';
import { UiFeedbackService } from '../../core/services/ui-feedback.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private uiFeedback = inject(UiFeedbackService);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isLoading = signal(false);

  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ibrahim-hassan-48287b250',
      icon: 'linkedin',
      display: 'Ibrahim Hassan'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Ibrahim-Hassan74',
      icon: 'github',
      display: 'Ibrahim-Hassan74'
    },
    {
      name: 'Facebook',
      url: 'https://web.facebook.com/ibrahim.hassan.309765',
      icon: 'facebook',
      display: 'Ibrahim Hassan'
    }
  ];

  contactInfo = [
    {
      label: 'Email',
      value: 'ibrahimhassan.dev1@gmail.com',
      icon: 'mail',
      link: 'mailto:ibrahimhassan.dev1@gmail.com'
    },
    {
      label: 'Phone',
      value: '+20 102 799 2904',
      icon: 'phone',
      link: 'tel:+201027992904'
    },
    {
      label: 'Location',
      value: 'Minya, Egypt',
      icon: 'map-pin',
      link: null
    }
  ];

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.dirty);
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const messageData: ContactMessage = this.contactForm.value as ContactMessage;

    try {
      await this.contactService.sendMessage(messageData);
      this.isLoading.set(false);
      this.contactForm.reset();
      this.uiFeedback.success('Your message has been sent successfully. Ibrahim will contact you soon.', 'Message Sent');
    } catch (err: any) {
      this.isLoading.set(false);
      console.error('Email send failed', err);
      const errorMessage = err.text || 'Failed to send message.';
      this.uiFeedback.error(errorMessage, 'Message Failed');
    }
  }
}
