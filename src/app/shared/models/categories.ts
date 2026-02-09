import { Photo } from './photo';

export interface Categories {
  id: string;
  name: string;
  description: string;
  photos: Photo[];
}
