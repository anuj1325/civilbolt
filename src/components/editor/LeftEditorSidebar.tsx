import React, { useState } from 'react';
import ProjectManagement from '../ProjectManagement'; // Assuming the path to Projectmanagement.tsx

const LeftEditorSidebar = () => {
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [showObligationModal, setShowObligationModal] = useState(false);

  return (
    <div className="w-64 bg-gray-50 h-full overflow-y-auto flex flex-col font-sans">
      <div className="p-4 space-y-2">
        <button className="w-full bg-blue-100 text-blue-800 py-3 px-4 rounded-full font-semibold text-sm shadow-sm hover:bg-blue-200 transition">
          Home
        </button>
        <button className="w-full bg-white border-2 border-blue-500 text-blue-500 py-3 px-4 rounded-full font-semibold text-sm shadow-sm hover:bg-blue-50 transition">
          + New
        </button>
        <h3 className="font-bold text-gray-800 text-sm mt-4 mb-2">References</h3>
        <button 
          className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-full font-semibold text-sm shadow-sm hover:bg-gray-200 transition"
          onClick={() => setShowSequenceModal(true)}
        >
          Sequence of Event
        </button>
        <button 
          className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-full font-semibold text-sm shadow-sm hover:bg-gray-200 transition"
          onClick={() => setShowObligationModal(true)}
        >
          Obligation Calendar
        </button>
        <h3 className="font-bold text-gray-800 text-sm mt-4 mb-2">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Empty Chat With PDF</span>
            <span className="text-xs text-gray-400">Aug 17, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Empty Chat With PDF</span>
            <span className="text-xs text-gray-400">Aug 17, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Empty Chat With PDF</span>
            <span className="text-xs text-gray-400">Aug 17, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Empty Chat With PDF</span>
            <span className="text-xs text-gray-400">Aug 17, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Summarize Indian laws regarding...</span>
            <span className="text-xs text-gray-400">Aug 17, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Empty Doc</span>
            <span className="text-xs text-gray-400">Aug 16, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Empty Doc</span>
            <span className="text-xs text-gray-400">Aug 16, 2025</span>
          </li>
          <li className="flex justify-between">
            <span>Empty Doc</span>
            <span className="text-xs text-gray-400">Aug 16, 2025</span>
          </li>
        </ul>
      </div>
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-1">All limit 324/500 Remaining</div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-3 overflow-hidden">
          <div className="bg-blue-500 h-full" style={{ width: `${(324 / 500) * 100}%` }} />
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold text-sm shadow-md hover:bg-orange-600 transition flex items-center justify-center">
          <span className="mr-1">🔥</span> Upgrade Now
        </button>
      </div>

      {showSequenceModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSequenceModal(false)}
        >
          <div 
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Sequence of Event</h2>
            <p className="text-gray-600 mb-6">Placeholder content for Sequence of Event modal.</p>
            <button 
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600 transition"
              onClick={() => setShowSequenceModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showObligationModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowObligationModal(false)}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 h-5/6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-grow overflow-y-auto">
              <ProjectManagement />
            </div>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600 transition mt-4 self-end"
              onClick={() => setShowObligationModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftEditorSidebar;