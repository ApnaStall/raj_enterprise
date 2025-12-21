import React from 'react'

function Products() {
  return (
    <>
    <div>
      <div className="w-full pt-32 px-6 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold text-[#003049] mb-6">
            Products
        </h1>
        <p className="text-lg leading-relaxed text-gray-800">
            Welcome to <span className="font-bold">Raj Enterprise</span>, where we specialize in manufacturing 
            high-quality hospital linen garments tailored for healthcare professionals and facilities. 
            Our extensive range includes doctor scrubs, patient dresses, lab coats, operation theater linens, 
            hospital uniforms, bedsheets, and more. Discover our durable and comfortable solutions designed to 
            meet the unique needs of healthcare settings.
        </p>
        <div className="mt-12 space-y-3">
            <div className="h-4 w-11/12 bg-linear-to-r from-[#c7e7fb] to-[#5da1c9] rounded-tr-full"></div>
            <div className="h-4 w-full bg-linear-to-r from-[#4b7b95] to-[#1d4e63] rounded-br-full"></div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Products
