import { Photo } from './Photo';

export interface Slide {
  title: string;
  category: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  photos: Photo[];
}
