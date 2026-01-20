import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RatingSummary } from '../../../../../shared/models/rating';

@Component({
  selector: 'app-rating-summary',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './rating-summary.component.html',
  styleUrl: './rating-summary.component.scss'
})
export class RatingSummaryComponent {
  summary = input<RatingSummary | null>(null);

  getStarPercentage(summary: RatingSummary | null, star: number): number {
    if (!summary || summary.totalRatings === 0) return 0;
    const count = (summary.scoreDistribution as any)[star] || 0;
    return (count / summary.totalRatings) * 100;
  }

  // Helper to calculate fill percentage for display stars (1-5)
  getFillPercentage(average: number, starIndex: number): number {
    const fill = Math.max(0, Math.min(100, (average - (starIndex - 1)) * 100));
    return fill;
  }
}
