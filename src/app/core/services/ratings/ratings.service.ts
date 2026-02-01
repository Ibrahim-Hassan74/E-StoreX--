import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Rating, RatingRequest, RatingResponse, RatingSummary } from '../../../shared/models/rating';
import { ResourceService } from '../resource.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsService extends ResourceService<Rating> {

  constructor() {
    super('Ratings');
  }

  createRating(rating: RatingRequest): Observable<Rating> {
    return this.post<Rating>('', rating);
  }

  updateRating(id: string, rating: RatingRequest): Observable<void> {
    return this.put<void>(id, rating);
  }

  deleteRating(id: string): Observable<void> {
    return this.delete<void>(id);
  }

  getProductRatings(productId: string): Observable<Rating[]> {
    return this.get<Rating[]>(`product/${productId}`);
  }

  getRatingSummary(productId: string): Observable<RatingSummary> {
    return this.get<RatingSummary>(`product/${productId}/summary`);
  }

  getUserRating(productId: string): Observable<Rating | null> {
    return this.get<Rating>(`product/${productId}/my-rating`).pipe(
      catchError(err => {
        if (err.status === 404) {
          return of(null);
        }
        return throwError(() => err);
      })
    );
  }
}
