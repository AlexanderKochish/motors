"use client";
import Header from "@/widgets/header/header";
import { useScrollAnimations } from "@/shared/hooks/useScrollAnimations";
import React from "react";
import Title from "../title/title";
import Services from "../services/services";
import Advantages from "../advantages/advantages";
import Testimonials from "../testimonials/testimonials";
import Gallery from "../gallery/gallery";
import Contacts from "../contacts/contacts";
import Modal from "@/widgets/modal/modal";

const HomeClient = () => {
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
};

export default HomeClient;
