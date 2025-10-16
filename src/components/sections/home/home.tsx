import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HomeClient from "./home-client";
import QueryProviders from "@/providers/QueryProvider";
import { getCompanyContact } from "@/app/actions/company-contact";

export default async function HomeContent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["company-contact"], queryFn: getCompanyContact });

  return (
    <QueryProviders>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeClient />
      </HydrationBoundary>
    </QueryProviders>
  );
}
