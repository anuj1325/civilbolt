import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Panel,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { WorkflowNode, CustomNodeData } from './WorkflowNode';
import { Play, RotateCcw, Download, FileCheck, Plus, Trash2, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { GradientEdge } from './GradientEdge';
import Technicalpage from './Technicalpage';
import Financialpage from './Financialpage';
import CompetitorAnalysisModal from './CompetitorAnalysisModal';
import ReportPage from './ReportPage';
import WorkflowRuns from './WorkflowRuns';

// Define project data for reference
const projects = [
  {
    name: "NH-23 Rehabilitation",
    location: "NH-23 Corridor, Odisha",
    dueDate: "Jul 2025",
    estimatedValue: "$25M",
    teamSize: "8 members",
    teamInitial: "R",
  },
  {
    name: "Metro Station",
    location: "City Central Line",
    dueDate: "Aug 2025",
    estimatedValue: "$40M",
    teamSize: "12 members",
    teamInitial: "M",
  },
  {
    name: "Airport Terminal",
    location: "International T3",
    dueDate: "October 2025",
    estimatedValue: "$60M",
    teamSize: "15 members",
    teamInitial: "A",
  },
];

const nodeTypes = {
  workflow: WorkflowNode,
};

const edgeTypes = {
  gradient: GradientEdge,
};

// Node templates for the side panel
const nodeTemplates = [
  {
    id: 'start',
    label: 'Start Node',
    type: 'start',
    description: 'Starting point of workflow',
    icon: '▶️',
    category: 'Basic'
  },
  {
    id: 'process',
    label: 'Process Node',
    type: 'process',
    description: 'Processing step',
    icon: '⚙️',
    category: 'Basic'
  },
  {
    id: 'assessment',
    label: 'Assessment Node',
    type: 'assessment',
    description: 'Assessment step',
    icon: '📊',
    category: 'Assessment'
  },
  {
    id: 'competitor',
    label: 'Competitor Analysis',
    type: 'competitor',
    description: 'Analyze competitors',
    icon: '👥',
    category: 'Analysis'
  },
  {
    id: 'decision',
    label: 'Go/No Go Decision',
    type: 'decision',
    description: 'Bidding recommendation',
    icon: '🎯',
    category: 'Decision'
  },
  {
    id: 'end',
    label: 'End Node',
    type: 'end',
    description: 'End point of workflow',
    icon: '🏁',
    category: 'Basic'
  }
];

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'workflow',
    position: { x: 10, y: 200 },
    data: {
      label: 'Select RFP',
      type: 'start',
      description: 'Choose Request for Proposal',
      status: 'completed'
    },
  },
  {
    id: '2',
    type: 'workflow',
    position: { x: 320, y: 100 },
    data: {
      label: 'Technical Verification',
      type: 'process',
      description: 'Verify technical details',
      status: 'pending'
    },
  },
  {
    id: '3',
    type: 'workflow',
    position: { x: 320, y: 300 },
    data: {
      label: 'Financial Verification',
      type: 'process',
      description: 'Verify financial details',
      status: 'pending'
    },
  },
  {
    id: '4',
    type: 'workflow',
    position: { x: 550, y: 200 },
    data: {
      label: 'Competitor Analysis',
      type: 'competitor',
      description: 'Analyze market competitors',
      status: 'pending',
      selectedCompetitors: []
    },
  },
  {
    id: '5',
    type: 'workflow',
    position: { x: 900, y: 40 },
    data: {
      label: 'Check Eligibility',
      type: 'assessment',
      description: 'Verify contractor eligibility',
      status: 'pending'
    },
  },
  {
    id: '6',
    type: 'workflow',
    position: { x: 900, y: 160 },
    data: {
      label: 'Technical Assessment',
      type: 'assessment',
      description: 'Evaluate technical capabilities',
      status: 'pending'
    },
  },
  {
    id: '7',
    type: 'workflow',
    position: { x: 900, y: 280 },
    data: {
      label: 'Financial Assessment',
      type: 'assessment',
      description: 'Analyze financial standing',
      status: 'pending'
    },
  },
  {
    id: '8',
    type: 'workflow',
    position: { x: 900, y: 400 },
    data: {
      label: 'Bid Capacity',
      type: 'assessment',
      description: 'Assess bidding capacity',
      status: 'pending'
    },
  },
  {
    id: '9',
    type: 'workflow',
    position: { x: 1200, y: 200 },
    data: {
      label: 'Report',
      type: 'end',
      description: 'Generate comprehensive report',
      status: 'pending'
    },
  },
  {
    id: '10',
    type: 'workflow',
    position: { x: 1500, y: 201 },
    data: {
      label: 'Go/No Go Decision',
      type: 'decision',
      description: 'Bidding recommendation based on assessments',
      status: 'pending'
    },
  },
  {
    id: '11',
    type: 'workflow',
    position: { x: 900, y: 520 },
    data: {
      label: 'SWOT & PESTLE Analysis',
      type: 'assessment',
      description: 'Perform SWOT & PESTLE analysis',
      status: 'pending'
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-3', source: '1', target: '3', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-4', source: '2', target: '4', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-4', source: '3', target: '4', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-5', source: '4', target: '5', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-6', source: '4', target: '6', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-7', source: '4', target: '7', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-8', source: '4', target: '8', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-11', source: '4', target: '11', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e5-9', source: '5', target: '9', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e6-9', source: '6', target: '9', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e7-9', source: '7', target: '9', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e8-9', source: '8', target: '9', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e11-9', source: '11', target: '9', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e9-10', source: '9', target: '10', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

// Side Panel Component
function SidePanel({ onAddNode, onDeleteNode, selectedNode, isCollapsed, onToggle }: {
  onAddNode: (template: any, position: { x: number; y: number }) => void;
  onDeleteNode: (nodeId: string) => void;
  selectedNode: Node<CustomNodeData> | null;
  isCollapsed: boolean;
  onToggle: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Basic', 'Assessment', 'Analysis'];

  const filteredTemplates = activeCategory === 'All' 
    ? nodeTemplates 
    : nodeTemplates.filter(template => template.category === activeCategory);

  const handleDragStart = (event: React.DragEvent, template: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
    event.dataTransfer.effectAllowed = 'move';
  };

  if (isCollapsed) {
    return (
      <div className="relative">
        <div className="w-12 bg-white border-r border-gray-200 flex flex-col h-full">
          <button
            onClick={onToggle}
            className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-200"
            title="Expand Panel"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1 p-2 space-y-2">
            {nodeTemplates.slice(0, 3).map((template) => (
              <div
                key={template.id}
                draggable
                onDragStart={(event) => handleDragStart(event, template)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded cursor-move hover:bg-gray-50 transition-colors"
                title={template.label}
              >
                <span className="text-sm">{template.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Node Library</h3>
          <p className="text-sm text-gray-500">Drag nodes to canvas</p>
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Collapse Panel"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="flex border-b border-gray-200">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-1 px-3 py-2 text-sm font-medium ${
              activeCategory === category
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              draggable
              onDragStart={(event) => handleDragStart(event, template)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{template.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{template.label}</div>
                <div className="text-sm text-gray-500">{template.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedNode && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Selected Node</h4>
          <div className="bg-gray-50 p-3 rounded-lg mb-3">
            <div className="font-medium text-gray-900">{selectedNode.data.label}</div>
            <div className="text-sm text-gray-500">{selectedNode.data.description}</div>
            <div className="text-xs text-gray-400 mt-1">Status: {selectedNode.data.status}</div>
            {selectedNode.data.type === 'competitor' && selectedNode.data.selectedCompetitors && (
              <div className="text-xs text-purple-600 mt-1">
                Selected: {selectedNode.data.selectedCompetitors.length} competitors
              </div>
            )}
          </div>
          <button
            onClick={() => onDeleteNode(selectedNode.id)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Node
          </button>
        </div>
      )}
    </div>
  );
}

export function WorkflowFlow({ selectedProject }: { selectedProject: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showTechnicalPage, setShowTechnicalPage] = useState(false);
  const [showFinancialPage, setShowFinancialPage] = useState(false);
  const [showCompetitorAnalysis, setShowCompetitorAnalysis] = useState(false);
  const [showReportPage, setShowReportPage] = useState(false);
  const [showWorkflowRuns, setShowWorkflowRuns] = useState(false);
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateNodeStatus = (nodeId: string, status: CustomNodeData['status']) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, status } } : node
      )
    );
  };

  const updateNodeData = (nodeId: string, data: Partial<CustomNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  };

  const handleVerificationComplete = (verificationType: 'technical' | 'financial') => {
    const nodeId = verificationType === 'technical' ? '2' : '3';
    updateNodeStatus(nodeId, 'completed');
  };

  const handleCompetitorAnalysisComplete = (selectedCompetitors: string[]) => {
    updateNodeData('4', { 
      status: 'completed',
      selectedCompetitors,
      description: `Analyze ${selectedCompetitors.length} selected competitors`
    });
    setShowCompetitorAnalysis(false);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node<CustomNodeData>) => {
    setSelectedNode(node);
    const { id, data } = node;
    
    switch (data.label) {
      case 'Select RFP':
        break;
      case 'Technical Verification':
        if (nodes.find(n => n.id === '1')?.data.status === 'completed') {
          setShowTechnicalPage(true);
        }
        break;
      case 'Financial Verification':
        if (nodes.find(n => n.id === '1')?.data.status === 'completed') {
          setShowFinancialPage(true);
        }
        break;
      case 'Competitor Analysis':
        if (nodes.find(n => n.id === '2')?.data.status === 'completed' && 
            nodes.find(n => n.id === '3')?.data.status === 'completed') {
          setShowCompetitorAnalysis(true);
        }
        break;
      case 'Report':
        setShowReportPage(true);
        break;
      default:
        if (data.status === 'selectable' || data.status === 'selected') {
          const newSelected = selectedAssessments.includes(id)
            ? selectedAssessments.filter(assessmentId => assessmentId !== id)
            : [...selectedAssessments, id];
          setSelectedAssessments(newSelected);
          updateNodeStatus(id, newSelected.includes(id) ? 'selected' : 'selectable');
        }
        break;
    }
  }, [nodes, selectedAssessments]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  const handleAddNode = useCallback((template: any, position: { x: number; y: number }) => {
    const newNode: Node<CustomNodeData> = {
      id: `${template.id}-${Date.now()}`,
      type: 'workflow',
      position,
      data: {
        label: template.label,
        type: template.type,
        description: template.description,
        status: 'pending',
        ...(template.type === 'competitor' && { selectedCompetitors: [] })
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const template = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      handleAddNode(template, position);
    },
    [reactFlowInstance, handleAddNode]
  );

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);

        const sourceStatus = sourceNode?.data?.status;
        const targetStatus = targetNode?.data?.status;

        if (sourceStatus === 'active' || (sourceStatus === 'completed' && targetStatus && targetStatus !== 'pending')) {
          return {
            ...edge,
            markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
          };
        }

        return { ...edge, markerEnd: { type: MarkerType.ArrowClosed } };
      })
    );
  }, [nodes, setEdges]);

  useEffect(() => {
    if (isSimulating) return;

    const techNode = nodes.find(n => n.id === '2');
    const finNode = nodes.find(n => n.id === '3');
    const competitorNode = nodes.find(n => n.id === '4');

    if (techNode?.data.status === 'completed' && finNode?.data.status === 'completed') {
      if (competitorNode?.data.status === 'completed') {
        setNodes(nds =>
          nds.map(n => {
            if (['5', '6', '7', '8', '11'].includes(n.id)) {
              return { ...n, data: { ...n.data, status: 'selectable' } };
            }
            return n;
          })
        );
      }
    }
  }, [nodes, setNodes, isSimulating]);

  const runWorkflow = useCallback(async () => {
    setIsSimulating(true);
    const nodeIds = ['1', '2', '3', '4', '5', '6', '7', '8', '11', '9', '10'];
    for (const nodeId of nodeIds) {
      updateNodeStatus(nodeId, 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateNodeStatus(nodeId, 'completed');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsSimulating(false);
  }, [setNodes]);

  const resetWorkflow = useCallback(() => {
    setNodes(initialNodes);
    setSelectedAssessments([]);
    setSelectedNode(null);
  }, [setNodes]);

  const exportWorkflow = useCallback(() => {
    const workflowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.data.label,
        type: node.data.type,
        position: node.position,
        status: node.data.status,
        selectedCompetitors: node.data.selectedCompetitors || []
      })),
      edges: edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        type: edge.type
      }))
    };
    
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'rfp-assessment-workflow.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges]);

  if (showTechnicalPage) {
    return <Technicalpage onClose={() => {
      setShowTechnicalPage(false);
      handleVerificationComplete('technical');
    }} />;
  }

  if (showFinancialPage) {
    return <Financialpage onClose={() => {
      setShowFinancialPage(false);
      handleVerificationComplete('financial');
    }} />;
  }

  if (showCompetitorAnalysis) {
    return <CompetitorAnalysisModal 
      onClose={() => setShowCompetitorAnalysis(false)}
      onComplete={handleCompetitorAnalysisComplete}
    />;
  }

  if (showReportPage) {
    const mockAssessmentResults = [
      {
        id: '5',
        name: 'Check Eligibility',
        status: 'completed' as const,
        score: 95,
        weight: 25,
        recommendation: 'go' as const,
        details: 'Contractor meets all eligibility requirements with strong compliance record',
        category: 'eligibility' as const
      },
      {
        id: '6',
        name: 'Technical Assessment',
        status: 'completed' as const,
        score: 88,
        weight: 25,
        recommendation: 'go' as const,
        details: 'Strong technical capabilities demonstrated with relevant project experience',
        category: 'technical' as const
      },
      {
        id: '7',
        name: 'Financial Assessment',
        status: 'completed' as const,
        score: 92,
        weight: 25,
        recommendation: 'go' as const,
        details: 'Financial capacity verified with adequate resources for project execution',
        category: 'financial' as const
      },
      {
        id: '8',
        name: 'Bid Capacity',
        status: 'completed' as const,
        score: 78,
        weight: 25,
        recommendation: 'conditional' as const,
        details: 'Bid capacity needs optimization but manageable with proper planning',
        category: 'capacity' as const
      }
    ];

    const mockProjectDetails = {
      name: selectedProject,
      value: projects.find(p => p.name === selectedProject)?.estimatedValue || 'Unknown',
      location: projects.find(p => p.name === selectedProject)?.location || 'Unknown',
      duration: '36 months',
      client: 'NHAI'
    };

    const mockCompetitorAnalysis = {
      selectedCount: 4,
      competitors: ['ABC Construction Ltd', 'XYZ Infrastructure', 'PQR Builders', 'LMN Construction']
    };

    const overallScore = Math.round(mockAssessmentResults.reduce((sum, assessment) => sum + assessment.score, 0) / mockAssessmentResults.length);
    const finalDecision = overallScore >= 80 ? 'go' : overallScore >= 60 ? 'conditional' : 'no-go';

    return (
      <ReportPage 
        onClose={() => setShowReportPage(false)}
        assessmentResults={mockAssessmentResults}
        projectDetails={mockProjectDetails}
        competitorAnalysis={mockCompetitorAnalysis}
        overallScore={overallScore}
        finalDecision={finalDecision}
      />
    );
  }

  if (showWorkflowRuns) {
    return <WorkflowRuns onClose={() => setShowWorkflowRuns(false)} />;
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex">
      <SidePanel 
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        selectedNode={selectedNode}
        isCollapsed={isPanelCollapsed}
        onToggle={() => setIsPanelCollapsed(!isPanelCollapsed)}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-800">Iron Triangle Limited</h3>
            <p className="text-sm text-gray-500">{selectedProject}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={runWorkflow}
              disabled={isSimulating}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <FileCheck className="w-4 h-4" />
              Run Flow
            </button>
            <button
              onClick={resetWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={exportWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowWorkflowRuns(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Play className="w-4 h-4" />
              Workflow Runs
            </button>
          </div>
        </div>
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            className="bg-gradient-to-br from-blue-50 via-white to-purple-50"
          >
            <Background 
              color="#d1d5db" 
              gap={25} 
              size={2}
              className="opacity-100"
            />
            <Controls className="bg-white shadow-lg rounded-lg" />
            <MiniMap 
              className="bg-white shadow-lg rounded-lg"
              nodeColor={(node) => {
                const nodeStatus = (node.data as any)?.status || 'pending';
                const statusColors: { [key: string]: string } = {
                  pending: '#9ca3af',
                  active: '#3b82f6',
                  completed: '#10b981',
                  selectable: '#f59e0b',
                  selected: '#8b5cf6',
                };
                return statusColors[nodeStatus] || statusColors.pending;
              }}
            />
            <Panel position="bottom-left" className="bg-white p-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Selectable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Selected</span>
                </div>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}