import { Photo } from './photo.model';

export interface Categories {
  id: string;
  name: string;
  description: string;
  photos: Photo[];
}
