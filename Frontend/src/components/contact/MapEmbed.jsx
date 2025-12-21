import React from 'react';

function MapEmbed() {
  return (
    <>
      <section className="w-full py-10">
        <div className="w-full h-112.5 rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.073034942684!2d72.91277057466584!3d19.104451651079785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7002c998839%3A0x4a4eda44167dffa9!2sVikhroli%20park%20site!5e0!3m2!1sen!2sin!4v1765042551694!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}

export default MapEmbed