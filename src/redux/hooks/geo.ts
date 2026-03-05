import { useQuery } from "@tanstack/react-query";
import { geoService } from "../services/geo.service";

export function useGeo() {
	const { data, isLoading } = useQuery({
		queryKey: ["geo"],
		queryFn: () => geoService.getGeo(),
	});

	return { data, isLoading };
}
 