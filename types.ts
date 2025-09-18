
export interface PostIdea {
  type: 'Reel' | 'Carousel' | 'Story' | 'Static Post';
  title: string;
  description: string;
}

export interface HashtagSet {
  broad: string[];
  niche: string[];
  specific: string[];
}

export interface DMTemplate {
  subject: string;
  body: string;
}

export interface PromotionPlan {
  accountType: string;
  messageTemplate: string;
}

export type ViewType = 'dashboard' | 'content' | 'hashtags' | 'dms' | 'promote';
