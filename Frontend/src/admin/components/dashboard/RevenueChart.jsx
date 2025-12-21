import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler // ✅ REQUIRED FOR fill
} from "chart.js";
import { Line } from "react-chartjs-2";

/* REGISTER EVERYTHING ONCE */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const RevenueChart = ({ data }) => {
  const labels = data.map(d => months[d._id - 1]);
  const values = data.map(d => d.total);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: values,
            borderColor: "#2563eb",
            backgroundColor: "rgba(37,99,235,0.15)",
            fill: true,          // ✅ now works
            tension: 0.45,
            pointRadius: 4
          }
        ]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 200,
        plugins: {
          legend: { display: false },
          tooltip: {
            intersect: false,
            mode: "index"
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: "#f1f5f9" } }
        }
      }}
    />
  );
};

export default RevenueChart;
