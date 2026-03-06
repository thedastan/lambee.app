import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analytics.service";

export function useAnalytics(dateFrom?: string, dateTo?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics", dateFrom, dateTo],
    queryFn: () => analyticsService.getAnalytics(dateFrom, dateTo),
  });
  return { data, isLoading };
}
 
export function useAnalyticsSummary() {
	const { data, isLoading } = useQuery({
		queryKey: ["analytics-summary"],
		queryFn: () => analyticsService.getAnalyticsSummary(),
	});

	return { data, isLoading };
}
 