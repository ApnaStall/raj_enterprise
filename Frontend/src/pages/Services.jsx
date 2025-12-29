import React from 'react';
import Navbar from '../components/layout/Navbar';
import TopDesign from '../components/section/TopDesign';
import { WhyChooseUsTiles } from '../components/section/WhyChooseUs';
import CraftedWith from '../components/section/CraftedWith';
import ProductCategoryGrid from '../components/home/ProductCategoryGrid';
import ClientsSection from '../components/section/ClientsSection';
import Testimonials from '../components/testimonial/Testimonials';
import Footer from '../components/layout/Footer';
import { Helmet } from "react-helmet-async";

function Services() {
  return (
    <>
        <Helmet>
            <title>Services | Raj Enterprise</title>
        </Helmet>
        <div>
        <Navbar />
        </div>
        <div>
            <TopDesign />
        </div>
        <div>
            <WhyChooseUsTiles />
        </div>
        <div>
            <CraftedWith />
        </div>
        <div>
            <ProductCategoryGrid />
        </div>
        <div>
            <ClientsSection />
        </div>
        <div>
            <Testimonials />
        </div>
        <div>
            <Footer />
        </div>
    </>
  )
}

export default Services
