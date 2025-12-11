import { useQuery } from "@tanstack/react-query";
import { bannersService } from "../services/banners.service";

export function useBanners() {
	const { data, isLoading } = useQuery({
		queryKey: ["banners"],
		queryFn: () => bannersService.getBanners(),
	});

	return { data, isLoading };
}
 