import React from 'react'
import Navbar from '../components/layout/Navbar'
import TopDesign from '../components/section/TopDesign'
import QualityAssurance from '../components/section/QualityAssurance'
import Testimonials from '../components/testimonial/Testimonials'
import Footer from '../components/layout/Footer'

function Quality() {
  return (
    <>
    <div>
        <Navbar />
    </div>
    <div>
      <TopDesign />
    </div>
    <div>
      <QualityAssurance />
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

export default Quality
