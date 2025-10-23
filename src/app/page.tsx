import HomeContent from "@/website/sections/home/home";
import Footer from "@/widgets/footer/footer";
import { ModalProvider } from "@/providers/ModalProvider/modal-provider";
import QueryProviders from "@/providers/QueryProvider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCompanyContact } from "./actions/company-contact";
import { getGalleryList } from "./actions/gallery";
import { getApprovedReviews } from "./actions/reviews";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["company-contact"], queryFn: getCompanyContact });

  return (
    <QueryProviders>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ModalProvider>
          <HomeContent />
          <Footer />
        </ModalProvider>
      </HydrationBoundary>
    </QueryProviders>
  );
}
