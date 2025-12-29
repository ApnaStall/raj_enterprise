import React from 'react'
import Navbar from '../components/layout/Navbar';
import Carousel from '../components/home/Carousel';
import CraftedWith from '../components/section/CraftedWith';
import ProductCategoryGrid from '../components/home/ProductCategoryGrid';
import WhyChooseUs from '../components/section/WhyChooseUs';
import WeHelpYou from '../components/home/WeHelpYou';
import CategoryCard from '../components/home/CategoryCard';
import Testimonials from '../components/testimonial/Testimonials';
import { QualityTiles } from '../components/section/QualityAssurance';
import Footer from '../components/layout/Footer';
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Raj Enterprise</title>
      </Helmet>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <CraftedWith />
      </div>
      <div>
        <ProductCategoryGrid />
      </div>
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <WeHelpYou />
      </div>
      <div>
        <CategoryCard />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <QualityTiles />
      </div>
      <div>
        <Footer />
      </div>
      </>
  )
}

export default Home
