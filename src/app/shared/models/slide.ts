import { Photo } from './photo';

export interface Slide {
  id: string;
  title: string;
  category: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  photos: Photo[];
}
