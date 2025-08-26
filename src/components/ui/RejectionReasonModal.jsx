import { Ban } from "lucide-react";
import Button from "./Button";

const RejectionReasonModal = ({ rejectionReason, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-200 ease-out" >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900/80 rounded-2xl shadow-xl p-6 scale-100 opacity-100 duration-200 ease-out animate-[fadeIn_0.3s_ease-out]">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ban className="text-red-600 dark:text-red-400" size={22} />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Rejection Reason
            </h2>
          </div>
        </div>

        <div className="max-h-48 overflow-y-auto text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line border border-gray-200 dark:border-gray-700 rounded-md p-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {rejectionReason?.trim() || "No reason was provided for this rejection."}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RejectionReasonModal;
