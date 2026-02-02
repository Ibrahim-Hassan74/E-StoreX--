import configJson from '../assets/config.json';

export const environment = {
  baseURL: 'https://estorex.runasp.net/api/v1/',
  // baseURL: 'https://localhost:7101/api/v1/',
  emailJs: {
    serviceId: configJson.serviceId,
    templateId: configJson.templateId,
    publicKey: configJson.publicKey,
  },
};
