import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileText, CheckCircle, Calculator, Shield, BarChart, DollarSign, FileCheck, MousePointerClick, Users } from 'lucide-react';
import { FaRunning } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { AiOutlineSelect } from 'react-icons/ai';
 
export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  type: 'start' | 'process' | 'decision' | 'assessment' | 'competitor' | 'end';
  status?: 'pending' | 'active' | 'completed' | 'selectable' | 'selected';
  description?: string;
  selectedCompetitors?: string[];
}

const getNodeIcon = (label: string, nodeType: string) => {
  const iconProps = "w-6 h-6";
  const typeColor = {
    start: "text-blue-500",
    process: "text-gray-500",
    decision: "text-amber-500",
    assessment: "text-teal-500",
    competitor: "text-purple-500",
    end: "text-green-500"
  };
  const color = typeColor[nodeType as keyof typeof typeColor] || 'text-gray-500';

  switch (label.toLowerCase()) {
    case 'select rfp':
      return <FileText className={`${iconProps} ${color}`} />;
    case 'technical verification':
    case 'financial verification':
      return <CheckCircle className={`${iconProps} ${color}`} />;
    case 'technical':
    case 'technical assessment':
      return <Calculator className={`${iconProps} ${color}`} />;
    case 'financial':
    case 'financial assessment':
      return <DollarSign className={`${iconProps} ${color}`} />;
    case 'check eligibility':
      return <Shield className={`${iconProps} ${color}`} />;
    case 'bid capacity':
      return <BarChart className={`${iconProps} ${color}`} />;
    case 'competitor analysis':
      return <Users className={`${iconProps} ${color}`} />;
    case 'go/no go decision':
      return <Shield className={`${iconProps} ${color}`} />;
    case 'report':
      return <FileCheck className={`${iconProps} ${color}`} />;
    default:
      return <CheckCircle className={`${iconProps} ${color}`} />;
  }
};

const getNodeStyles = (nodeType: string, status: string = 'pending') => {
  const baseStyles = "p-3 rounded-md border-l-4 shadow-md transition-all duration-300 hover:shadow-lg w-[220px] relative cursor-pointer";

  const typeStyles = {
    start: "border-blue-500",
    process: "border-gray-400",
    decision: "border-amber-500",
    assessment: "border-teal-500",
    competitor: "border-purple-500",
    end: "border-green-500"
  };

  const statusStyles: { [key: string]: string } = {
    pending: "bg-white text-gray-800 border border-gray-300",
    active: "bg-blue-50 text-blue-900 ring-2 ring-blue-300",
    completed: "bg-green-50 text-green-900",
    selectable: "bg-yellow-50 text-yellow-900 ring-2 ring-yellow-300",
    selected: "bg-purple-50 text-purple-900 ring-2 ring-purple-300",
  };

  return `${baseStyles} ${typeStyles[nodeType as keyof typeof typeStyles] || 'border-gray-400'} ${statusStyles[status]}`;
};

export function WorkflowNode({ data, selected }: NodeProps<CustomNodeData>) {
  const { label, type, status = 'pending', description } = data;
  
  return (
    <div className={`${getNodeStyles(type, status)} ${selected ? 'ring-4 ring-offset-1 ring-blue-400' : ''}`}>
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !-left-2.5 !bg-gray-300 !border-2 !border-white"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100">
          {getNodeIcon(label, type)}
        </div>
        <div className="flex-grow text-left">
          <div className="font-semibold text-sm text-gray-900">{label}</div>
          {description && (
            <div className="text-xs text-gray-500 mt-0.5">
              {description}
            </div>
          )}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !-right-2.5 !bg-gray-300 !border-2 !border-white"
      />

      {status === 'active' && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1 animate-pulse">
          <FaRunning className="w-3 h-3" />
        </div>
      )}

      {status === 'completed' && (
        <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
          <IoMdCheckmarkCircleOutline className="w-4 h-4" />
        </div>
      )}

      {status === 'selectable' && (
        <div className="absolute top-1 right-1 bg-yellow-500 text-white rounded-full p-1">
          <MousePointerClick className="w-3 h-3" />
        </div>
      )}

      {status === 'selected' && (
        <div className="absolute top-1 right-1 bg-purple-500 text-white rounded-full p-1">
          <AiOutlineSelect className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}