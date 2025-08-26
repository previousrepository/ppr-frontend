import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "./Button";

const PageHeader = ({ to, icon = <ArrowLeft size={18} />, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 z-10 w-full h-16 flex items-center px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        {to && (
          <Link
            to={to}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 flex items-center justify-center transition"
            aria-label="Go back"
          >
            <Button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 flex items-center justify-center transition"
              aria-label="Go back"
            >
              {icon}
            </Button>
          </Link>
        )}

        <div>
          <h1 className="text-base font-semibold capitalize text-gray-800 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;