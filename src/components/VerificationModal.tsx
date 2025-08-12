import React from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, string>;
}

export function VerificationModal({ isOpen, onClose, title, data }: VerificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div>
          <ul className="space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="font-medium text-gray-600">{key}:</span>
                <span className="text-gray-800">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}