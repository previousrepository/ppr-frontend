import { X } from "lucide-react";

const InfoModal = ({ onClose, children, title }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--color-surface)] dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-red-500 hover:text-red-800 dark:hover:text-red-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        {title && (
          <h2>
            {title}
          </h2>
        )}
        <div className="text-gray-700 dark:text-gray-200 text-sm space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};


export default InfoModal;
