"use client";

import { useModal } from "@/hooks/useModal";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { Testimonial } from "@/types";
import Header from "@/components/widgets/header/header";
import Services from "../services/services";
import Advantages from "../advantages/advantages";
import Testimonials from "../testimonials/testimonials";
import Gallery from "../gallery/gallery";
import Contacts from "../contacts/contacts";
import Modal from "@/components/widgets/modal/modal";
import Title from "../title/title";

export default function HomeContent() {
  useScrollAnimations();

  return (
    <>
      <Header />
      <main>
        <Title />
        <Services />
        <Advantages />
        <Testimonials />
        <Gallery />
        <Contacts />
      </main>
      <Modal />
    </>
  );
}
