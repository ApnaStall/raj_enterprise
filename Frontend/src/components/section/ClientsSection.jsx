import { useEffect, useState } from "react";
import { log, error } from "../../utils/logger";

export default function ClientsSection() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetch("http://localhost:5000/api/service");

        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await res.json();

        // Map backend fields to UI-friendly format
        const formatted = data.map((item) => ({
          id: item._id,
          name: item.service_name,
          location: item.service_location,
          logo: item.service_logo,
        }));

        setClients(formatted);
      } catch (err) {
        error("Error loading services:", err);
      }
    }

    loadClients();
  }, []);

  const dotColors = ["#3ac9a8", "#ff008c", "#febc24", "#d4e93e", "#b14b90"];

  return (
    <section className="bg-[#F5F5F5] w-full py-20 px-6 md:px-20 mt-20">
      <h2 className="text-4xl font-semibold text-center mb-12 text-[#222]">
        Our Clients
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-14 place-items-center">
        {clients.map((c, index) => (
          <div key={c.id} className="flex flex-col items-center text-center">
            <div
              className="w-32 h-32 rounded-full shadow-xl bg-white flex items-center justify-center"
              style={{ backgroundColor: dotColors[index % dotColors.length] }}
            >
              <img
                src={c.logo}
                alt={c.name}
                className="w-28 h-28 rounded-full object-contain"
              />
            </div>

            <div
              className="w-4 h-4 rounded-full mt-3"
              style={{ backgroundColor: dotColors[index % dotColors.length] }}
            ></div>

            <h3 className="mt-3 text-xl font-semibold text-black leading-tight">
              {c.name}
            </h3>

            <p className="mt-1 text-gray-600 text-sm leading-tight">
              {c.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
