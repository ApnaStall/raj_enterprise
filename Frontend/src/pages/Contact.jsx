import React from 'react'
import Navbar from '../components/layout/Navbar'
import ContactUs from '../components/contact/ContactUs'
import ContactForm from '../components/contact/ContactForm'
import MapEmbed from '../components/contact/MapEmbed'
import Footer from '../components/layout/Footer'

function Contact() {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div>
      <ContactUs />
    </div>
    <div>
      <ContactForm />
    </div>
    <div>
      <MapEmbed />
    </div>
    <div>
      <Footer />
    </div>
    </>
  )
}

export default Contact
