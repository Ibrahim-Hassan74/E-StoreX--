import { Photo } from './photo';

export interface Product {
  id: string;
  name: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  categoryName: string;
  quantityAvailable: number;
  brandName: string;
  photos: Photo[];
}
