const StatCard = ({ title, value, icon, highlight }) => {
  return (
    <div
      className={`rounded-xl border shadow-sm p-5 bg-white ${
        highlight ? "ring-2 ring-blue-100" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">
            {value}
          </p>
        </div>

        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
