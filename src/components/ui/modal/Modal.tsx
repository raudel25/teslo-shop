import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export const Modal = ({ isOpen, type, message, onClose }: Props) => {
  if (!isOpen) return null;

  const modalColor =
    type === "success"
      ? "text-green-500"
      : type === "error"
      ? "text-red-500"
      : "";

  const Icon = type === "success" ? AiOutlineCheckCircle : AiOutlineCloseCircle;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <Icon className={`w-16 h-16 ${modalColor}`} />
          <h2 className={`text-2xl font-semibold ${modalColor}`}>
            {type === "success" ? "Success" : "Error"}
          </h2>
          <p className="text-gray-700 text-center">{message}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
