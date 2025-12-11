"use client";

import LayoutPage from "@/components/layout/LayoutPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Providers: React.FC<LayoutProps> = ({ children }) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	);

	return (
		<QueryClientProvider client={client}>
			<LayoutPage>
				<main>{children}</main>
			</LayoutPage>
		</QueryClientProvider>
	);
};

export default Providers;
