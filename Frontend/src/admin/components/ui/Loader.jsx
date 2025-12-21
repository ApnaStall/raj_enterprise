const Loader = ({ text = "Loading..." }) => (
  <div className="flex justify-center items-center py-10 text-gray-500">
    {text}
  </div>
);

export default Loader;
