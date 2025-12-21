const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default ChartCard;
