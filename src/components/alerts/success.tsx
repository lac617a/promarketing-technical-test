import React from "react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
  open: boolean;
  message: string;
  onClose: () => void;
}

const AlertSuccess: React.FC<Props> = ({ open, message, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed top-10 w-[90%] mx-auto left-0 right-0 rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
