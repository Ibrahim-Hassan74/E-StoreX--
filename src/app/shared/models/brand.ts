import { Photo } from './photo.model';

export interface Brand {
  id: string;
  name: string;
  photos: Photo[];
}
