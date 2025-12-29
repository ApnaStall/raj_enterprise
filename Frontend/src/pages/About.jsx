import React from 'react';
import Navbar from '../components/layout/Navbar';
import AboutUs from '../components/about/AboutUs';
import WhyChooseUs from '../components/section/WhyChooseUs';
import Testimonials from '../components/testimonial/Testimonials';
import Footer from '../components/layout/Footer';
import { Helmet } from "react-helmet-async";


function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Raj Enterprise</title>
      </Helmet>
      <div>
        <Navbar />
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <WhyChooseUs />
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

export default About
