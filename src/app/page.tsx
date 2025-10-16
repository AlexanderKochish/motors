import HomeContent from "@/components/sections/home/home";
import Footer from "@/components/widgets/footer/footer";
import { ModalProvider } from "@/providers/ModalProvider/modal-provider";
import QueryProviders from "@/providers/QueryProvider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryProviders>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ModalProvider>
            <HomeContent />
          </ModalProvider>
        </HydrationBoundary>
      </QueryProviders>
      <Footer />
    </>
  );
}
