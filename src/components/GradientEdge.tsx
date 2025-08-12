import { EdgeProps, getBezierPath } from '@xyflow/react';

export function GradientEdge({ 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition, 
  markerEnd 
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path
        d={edgePath}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth={2}
        markerEnd={markerEnd}
      />
    </>
  );
}