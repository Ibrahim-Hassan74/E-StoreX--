export interface Rating {
  id: string;
  score: number;
  comment: string;
  productId: string;
  userName: string;
}

export interface RatingRequest {
  score: number;
  comment: string;
  productId?: string; // Optional for updates
}

export interface RatingSummary {
  averageScore: number;
  totalRatings: number;
  scoreDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface RatingResponse {
  success: boolean;
  message: string;
  statusCode: number;
}
