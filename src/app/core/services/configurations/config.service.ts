import { Injectable } from '@angular/core';
import configJson from '../../../../assets/config.json';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config = configJson;
  get apiKey(): string {
    return this.config?.apiKey || '';
  }
  get clientId(): string {
    return this.config?.clientId || '';
  }
  get publishableKey(): string {
    return this.config?.publishableKey || '';
  }
}
