import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import h3 from "../../assets/h3.png";
import h4 from "../../assets/h4.png";
import h5 from "../../assets/h5.png";
import h6 from "../../assets/h6.png";
import h7 from "../../assets/h7.png";

export function QualityTiles() {
  const navigate = useNavigate();
  return (
    <>
    <section className="w-full py-16 px-6 md:px-20">

      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-semibold text-[#003049]">
          Quality Assurance
        </h2>

        <button
        onClick={() => navigate("/Quality")}
        className="text-[#0066cc] font-medium hover:underline"
        >
          View All Posts
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-14">

        <div className="text-center w-full max-w-[360px]">
          <Link to="/Quality" className="relative cursor-pointer group">
            <img
              src={h4}
              alt="Branding"
              className="rounded-3xl w-full h-64 object-cover shadow-md hover:opacity-50"
            />
          </Link>
          <h3 className="mt-4 text-lg font-medium text-[#0066cc]">
            Branding Of Our Company
          </h3>
        </div>

        <div className="text-center w-full max-w-[360px]">
          <Link to="/Quality" className="relative cursor-pointer group">
            <img
              src={h5}
              alt="Material"
              className="rounded-3xl w-full h-64 object-cover shadow-md hover:opacity-50"
            />
          </Link>
          <h3 className="mt-4 text-lg font-medium text-[#0066cc]">
            Material Which We Used In O.T. Linen
          </h3>
        </div>

        <div className="text-center w-full max-w-[360px]">
          <Link to="/Quality" className="relative cursor-pointer group">
            <img
              src={h6}
              alt="Machinery"
              className="rounded-3xl w-full h-64 object-cover shadow-md hover:opacity-50"
            />
          </Link>
          <h3 className="mt-4 text-lg font-medium text-[#0066cc]">
            Excellent Quality Machinery
          </h3>
        </div>

      </div>

    </section>
    </>
  );
}

export default function QualityAssurance() {
  const [previewImage, setPreviewImage] = useState(null);

  const items = [
    { title: "Logo Of Our Company", image: logo },
    { title: "Our Valueable Customers", image: h3 },
    { title: "Excellent Quality Machinery", image: h6 },
    { title: "Ready To Go!", image: h4 },
    { title: "Branding Of Our Company", image: h5 },
    { title: "Clean Stitched", image: h7 },
  ];

  return (
    <>
    <section className="w-full py-16 px-6 md:px-20">

      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14 text-[#222]">
        Quality Assurance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-[95%] md:w-[420px] h-80 rounded-xl overflow-hidden shadow-md cursor-pointer border border-gray-200 hover:scale-[1.02] transition"
              onClick={() => setPreviewImage(item.image)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-3 text-xl text-blue-600 font-medium text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-xl max-w-5xl w-[95%] p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-700 hover:text-black"
            >
              ×
            </button>

            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
    </>
  );
}
