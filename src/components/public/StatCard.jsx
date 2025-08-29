const StatCard = ({ title, value, icon: Icon, bgColor }) => {
  return (
    <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-md md:text-lg font-semibold text-black dark:text-white">
          {title}
        </h3>

        <span className={`p-2 rounded-full ${bgColor}`}>
          <Icon className="h-5 w-5 text-white" />
        </span>
      </div>
      <p className="text-2xl font-bold text-black dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
