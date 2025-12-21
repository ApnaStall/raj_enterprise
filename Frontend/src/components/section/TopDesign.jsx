import s1 from "../../assets/s1.png";

export default function TopDesign() {
  return (
    <>
    <section className="w-full flex flex-col items-center pt-28 px-4 md:px-20">

      <img
        src={s1}
        alt="Services Header"
        className="w-full max-w-5xl mx-auto rounded-3xl shadow-xl"
      />

      <div className="w-full max-w-4xl mt-6 bg-linear-to-r from-[#4bb0c9] to-[#006f91] text-white py-4 px-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-center gap-6">
        
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="text-lg">📞</span>
          +91 9137849641
        </div>

        <div className="flex items-center gap-2 text-sm md:text-base">
          🌐
          <a href="#" className="underline">
            www.rajenterprise.in
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm md:text-base">
          📍 Mumbai - 400079 [Maharashtra]
        </div>

      </div>

      <div className="flex flex-col gap-6 mt-12 w-full max-w-xl">

        <a
          href="/Rate_List.pdf"
          download
          className="w-full text-center bg-[#003b4d] text-white text-lg py-4 rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
        >
          Download Rate List
        </a>

        {/* <button className="w-full bg-[#004f67] text-white text-lg py-4 rounded-2xl shadow-md hover:scale-105 transition">
          Get Brochure
        </button> */}

      </div>
    </section>
    </>
  );
}
