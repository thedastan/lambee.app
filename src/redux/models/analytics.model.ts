export interface IAnalyticsSummary {
	detail: DetailSummary;
}

export interface DetailSummary {
	total_spent: number;
	total_saved: number;
	time_saved_hours: number;
}


///

export interface IAnalytics {
  detail: Detail
}

export interface Detail {
  total_spent: number
  diapers_used: number
  sizes_used: any[]
}
