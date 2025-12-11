import { useQuery } from "@tanstack/react-query";
import { storiesService } from "../services/stories.service";

export function useStories() {
	const { data, isLoading } = useQuery({
		queryKey: ["stories"],
		queryFn: () => storiesService.getStories(),
	});

	return { data, isLoading };
}
 