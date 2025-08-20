import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { RotateCcw, Download, FileCheck } from 'lucide-react';
import { GradientEdge } from './GradientEdge';

// ReactFlow expects nodeTypes to be Record<string, React.ComponentType<any>>
const nodeTypes: Record<string, any> = {
  workflow: WorkflowNode,
};

const edgeTypes = {
  gradient: GradientEdge,
};



const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'workflow',
    position: { x: 10, y: 200 },
    data: {
      label: 'Upload Contract',
      type: 'start',
      description: 'Upload contract documents',
      status: 'pending',
    },
  },
  {
    id: '1a',
    type: 'workflow',
    position: { x: 170, y: 200 },
    data: {
      label: 'Upload Sequence of Event',
      type: 'process',
      description: 'Upload the sequence of events after contract upload',
      status: 'pending',
    },
  },
  {
    id: '2',
    type: 'workflow',
    position: { x: 320, y: 100 },
    data: {
      label: 'Appoint Date & Site Handover',
      type: 'process',
      description: 'Set appointment date and handover site',
      status: 'pending',
    },
  },
  {
    id: '3',
    type: 'workflow',
    position: { x: 600, y: 100 },
    data: {
      label: 'Design & Drawing Phase',
      type: 'process',
      description: 'Design and drawing activities',
      status: 'pending',
    },
  },
  {
    id: '4',
    type: 'workflow',
    position: { x: 900, y: 100 },
    data: {
      label: 'Authority Obligation',
      type: 'assessment',
      description: 'Obligations of the authority',
      status: 'pending',
    },
  },
  {
    id: '5',
    type: 'workflow',
    position: { x: 1200, y: 100 },
    data: {
      label: 'Contractor Obligations',
      type: 'assessment',
      description: 'Obligations of the contractor',
      status: 'pending',
    },
  },
  {
    id: '6',
    type: 'workflow',
    position: { x: 1500, y: 100 },
    data: {
      label: 'State PWD SOP',
      type: 'end',
      description: 'State PWD Standard Operating Procedures',
      status: 'pending',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-1a', source: '1', target: '1a', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1a-2', source: '1a', target: '2', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-3', source: '2', target: '3', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-4', source: '3', target: '4', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-5', source: '4', target: '5', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e5-6', source: '5', target: '6', type: 'gradient', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

export function TemporalFlowWorkflow({ selectedProject }: { selectedProject: string }) {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // Removed unused reactFlowInstance
  const [isSimulating, setIsSimulating] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const handleContractorObligationClick = () => {
  navigate('/project-management');
};

  const updateNodeStatus = (nodeId: string, status: CustomNodeData['status']) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, status } } : node
      )
    );
  };

  const runWorkflow = useCallback(async () => {
    setIsSimulating(true);
    const nodeIds = ['1', '1a', '2', '3', '4', '5', '6'];
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
  }, [setNodes]);

  const exportWorkflow = useCallback(() => {
    const workflowData = {
      nodes: nodes.map(node => ({
        id: node.id,
        label: node.data.label,
        type: node.data.type,
        position: node.position,
        status: node.data.status,
      })),
      edges: edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        type: edge.type
      }))
    };
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = 'temporal-flow-workflow.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges]);

  return (
    <div className="w-full h-screen bg-gray-50 flex">
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
              onClick={handleContractorObligationClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Report
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
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default TemporalFlowWorkflow;
