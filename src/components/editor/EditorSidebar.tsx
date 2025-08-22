import React from "react";
import { CheckCircle, Lightbulb, Users, Send } from "lucide-react";

interface ScoreBarProps {
  label: string;
  score: number;
}

const CATEGORY_CONFIG = {
  Correctness: { colorBar: "bg-red-500", colorText: "text-red-500", icon: <CheckCircle size={16} className="text-red-500" /> },
  Clarity: { colorBar: "bg-blue-500", colorText: "text-blue-500", icon: <Lightbulb size={16} className="text-blue-500" /> },
  Engagement: { colorBar: "bg-green-500", colorText: "text-green-500", icon: <Users size={16} className="text-green-500" /> },
  Delivery: { colorBar: "bg-purple-500", colorText: "text-purple-500", icon: <Send size={16} className="text-purple-500" /> },
  Default: { colorBar: "bg-gray-500", colorText: "text-gray-500", icon: null },
};

const ScoreBar: React.FC<ScoreBarProps> = ({ label, score }) => {
  const config = CATEGORY_CONFIG[label] || CATEGORY_CONFIG.Default;
  return (
    <div className="flex flex-col items-center w-24">
      {/* Label row: icon + text */}
      <span className={`mb-2 flex items-center gap-1 font-semibold text-sm ${config.colorText}`}>
        <span className="rounded-full bg-gray-100 p-1">{config.icon}</span>
        {label}
      </span>
      {/* Colored underline bar */}
      <div className="h-2 w-full rounded-full bg-gray-100 relative">
        <div
          className={`absolute left-0 top-0 h-2 rounded-full ${config.colorBar} transition-all duration-300`}
          style={{ width: `${score}%` }}
        />
      </div>
      {/* Score number */}
      <span className={`mt-1 ${config.colorText} font-bold text-base`}>{score}</span>
    </div>
  );
};

interface EditorSidebarProps {
  sidebarTab: string;
  setSidebarTab: (tab: string) => void;
  legalScore: number;
  contractualScore: number;
  lexicalScore: number;
  grammaticalScore: number;
  citations: string[];
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  sidebarTab,
  setSidebarTab,
  legalScore,
  contractualScore,
  lexicalScore,
  grammaticalScore,
  citations,
}) => {
  return (
    <div className="flex-1 bg-white border-l border-gray-200 overflow-y-auto" style={{ minWidth: "320px" }}>
      <div className="px-0 pt-0 pb-4">
        {/* Grammarly-style tab buttons */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setSidebarTab("score")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              sidebarTab === "score"
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Score
          </button>
          <button
            onClick={() => setSidebarTab("citations")}
            className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
              sidebarTab === "citations"
                ? "border-blue-600 text-blue-600 bg-white"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Citations
          </button>
        </div>

        {/* Content */}
        {sidebarTab === "score" && (
          <div className="flex justify-between items-start gap-2 p-4">
            <ScoreBar label="Correctness" score={legalScore} />
            <ScoreBar label="Clarity" score={contractualScore} />
            <ScoreBar label="Engagement" score={lexicalScore} />
            <ScoreBar label="Delivery" score={grammaticalScore} />
          </div>
        )}

        {sidebarTab === "citations" && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Citations</h3>
            {citations.length > 0 ? (
              <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                {citations.map((cite, idx) => (
                  <li key={idx}>{cite}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No citations found in the draft.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorSidebar;

