import {
  Chart as ChartJS,
  ArcElement,   // ✅ REQUIRED FOR Doughnut
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

/* REGISTER REQUIRED ELEMENTS */
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = ({ data }) => {
  return (
    <Doughnut
      data={{
        labels: data.map(d => d._id),
        datasets: [
          {
            data: data.map(d => d.count),
            backgroundColor: [
              "#facc15", // Pending
              "#60a5fa", // Processing
              "#22c55e", // Delivered
              "#ef4444"  // Cancelled
            ],
            borderWidth: 0
          }
        ]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 200, 
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 12 }
          },
          tooltip: {
            intersect: false
          }
        }
      }}
    />
  );
};

export default OrderStatusChart;
