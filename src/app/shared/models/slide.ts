import { Photo } from './photo';

export interface Slide {
  title: string;
  category: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  photos: Photo[];
}
