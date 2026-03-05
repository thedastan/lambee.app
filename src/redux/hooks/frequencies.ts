import { useQuery } from "@tanstack/react-query";
import { geoService } from "../services/geo.service";
import { frequenciesService } from "../services/frequencies.service";

export function useFrequencies() {
	const { data, isLoading } = useQuery({
		queryKey: ["frequencies"],
		queryFn: () => frequenciesService.getFrequencies(),
	});

	return { data, isLoading };
}
 