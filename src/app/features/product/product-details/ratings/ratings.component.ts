import { Component, Input, OnInit, inject, signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { RatingsService } from '../../../../core/services/ratings/ratings.service';
import { AccountService } from '../../../../core/services/account/account.service';
import { UiFeedbackService } from '../../../../core/services/ui-feedback.service';
import { Rating, RatingRequest, RatingSummary } from '../../../../shared/models/rating';

import { RatingSummaryComponent } from './rating-summary/rating-summary.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { RatingFormComponent } from './rating-form/rating-form.component';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    LucideAngularModule,
    RatingSummaryComponent,
    RatingListComponent,
    RatingFormComponent
  ],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent implements OnInit {
  private ratingsService = inject(RatingsService);
  private accountService = inject(AccountService);
  private uiFeedback = inject(UiFeedbackService);
  public router = inject(Router);

  // @Input({ required: true }) productId!: string;
  productId = input.required<string>();

  ratings = signal<Rating[]>([]);
  summary = signal<RatingSummary | null>(null);
  userRating = signal<Rating | null>(null);
  
  isLoading = signal<boolean>(false);
  isActionLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  currentUser = this.accountService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());

  ngOnInit(): void {
    if (this.productId()) {
      this.loadAllData();
    }
  }

  loadAllData() {
    this.isLoading.set(true);
    
    this.loadSummary();
    this.loadRatings();
    
    if (this.isLoggedIn()) {
      this.loadUserRating();
    }
  }

  loadSummary() {
    this.ratingsService.getRatingSummary(this.productId()).subscribe({
      next: (summary) => this.summary.set(summary),
      error: () => console.log('No summary')
    });
  }

  loadRatings() {
    this.ratingsService.getProductRatings(this.productId()).subscribe({
      next: (ratings) => {
        this.ratings.set(ratings);
        this.isLoading.set(false);
      },
      error: (err) => { 
        console.error(err); 
        this.isLoading.set(false);
      }
    });
  }

  loadUserRating() {
    this.ratingsService.getUserRating(this.productId()).subscribe({
      next: (rating) => this.userRating.set(rating || null),
      error: () => {
        this.userRating.set(null)
        console.log('No rating found');
      } 
    });
  }

  onSaveRating(data: { score: number, comment: string }) {
    this.isActionLoading.set(true);
    this.errorMessage.set(null);

    const request: RatingRequest = {
      productId: this.productId(),
      score: data.score,
      comment: data.comment
    };

    const currentRating = this.userRating();
    if (currentRating) {
      this.ratingsService.updateRating(currentRating.id, request).subscribe({
        next: () => {
          this.isActionLoading.set(false);
          this.loadAllData();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.ratingsService.createRating(request).subscribe({
        next: () => {
          this.isActionLoading.set(false);
          this.loadAllData();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  async onDeleteRating() {
    const currentRating = this.userRating();
    if (!currentRating) return;

    const confirmed = await this.uiFeedback.confirm('Are you sure you want to delete your review?');
    if (!confirmed) return;

    this.isActionLoading.set(true);
    this.ratingsService.deleteRating(currentRating.id).subscribe({
      next: () => {
        this.userRating.set(null);
        this.isActionLoading.set(false);
        this.loadAllData(); 
        this.uiFeedback.success('Your review has been deleted.');
      },
      error: (err) => {
        this.isActionLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Failed to delete rating');
      }
    });
  }

  handleError(err: any) {
    this.isActionLoading.set(false);
    this.errorMessage.set(err.error?.message || 'Operation failed');
    setTimeout(() => this.errorMessage.set(null), 3000);
  }
}
