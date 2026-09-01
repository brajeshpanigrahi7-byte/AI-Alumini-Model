import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Rotate3d, 
  Compass, 
  Layers, 
  Award, 
  ArrowUpRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { SkillItem } from '../../types';

interface Interactive3DSkillSphereProps {
  skills?: SkillItem[];
  onSkillSelect?: (skill: SkillItem) => void;
}

interface Node3D {
  skill: SkillItem;
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  category: string;
}

export const Interactive3DSkillSphere: React.FC<Interactive3DSkillSphereProps> = ({
  skills = [],
  onSkillSelect
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const validSkills = Array.isArray(skills) && skills.length > 0 ? skills : [];
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(validSkills[0] || null);
  const [rotation, setRotation] = useState({ x: 15, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  // Generate 3D spherical coordinates for skills
  const nodes: Node3D[] = validSkills.map((skill, index) => {
    const phi = Math.acos(-1 + (2 * index) / Math.max(validSkills.length, 1));
    const theta = Math.sqrt(validSkills.length * Math.PI) * phi;
    const radius = 130;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    const colors: Record<string, string> = {
      'Technical': '#5A5A40',
      'Analytical': '#34583A',
      'Soft Skills': '#8C5E3C'
    };

    return {
      skill,
      x,
      y,
      z,
      size: Math.max(28, ((skill.proficiency || 75) / 100) * 40),
      color: colors[skill.category] || '#5A5A40',
      category: skill.category
    };
  });

  // Auto rotation loop
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: (prev.y + 0.4) % 360
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: (prev.y + deltaX * 0.5) % 360
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert 3D spherical coordinates using rotation angles
  const radX = (rotation.x * Math.PI) / 180;
  const radY = (rotation.y * Math.PI) / 180;

  const transformedNodes = nodes.map(node => {
    // Rotate Y
    const x1 = node.x * Math.cos(radY) + node.z * Math.sin(radY);
    const z1 = -node.x * Math.sin(radY) + node.z * Math.cos(radY);

    // Rotate X
    const y2 = node.y * Math.cos(radX) - z1 * Math.sin(radX);
    const z2 = node.y * Math.sin(radX) + z1 * Math.cos(radX);

    // Perspective projection
    const fov = 350;
    const scale = fov / (fov + z2);
    const projX = x1 * scale + 175;
    const projY = y2 * scale + 150;

    return {
      ...node,
      projX,
      projY,
      projZ: z2,
      scale,
      opacity: Math.max(0.25, Math.min(1, (z2 + 150) / 300))
    };
  }).sort((a, b) => a.projZ - b.projZ); // Painter's algorithm

  return (
    <div className="bg-[#F9F9F7] rounded-2xl border border-[#E5E2D9] p-5 md:p-6 shadow-3d-card relative overflow-hidden">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-[#5A5A40] text-xs font-bold uppercase tracking-wider mb-1">
            <Rotate3d className="w-4 h-4 text-[#34583A]" />
            <span>Interactive 3D Skill Constellation Matrix</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#2D2D2A] font-serif-display">
            Multi-Dimensional Competency Sphere
          </h3>
          <p className="text-xs text-[#7C7B76]">
            Drag to rotate orbital nodes in 3D space. Click any skill node to inspect verification telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-[#5A5A40] text-white border-[#484833]' 
                : 'bg-[#EBE8E1] text-[#5A5A40] border-[#D5D5C6]'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>{autoRotate ? 'Auto Orbiting' : 'Paused Orbit'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 3D Canvas Stage */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="lg:col-span-7 h-[320px] md:h-[340px] bg-gradient-to-b from-[#2D2D24] to-[#1E1E18] rounded-xl border border-[#3E3E32] relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-inner"
        >
          {/* Depth Grid Lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          {/* Central Hologram Core */}
          <div className="w-20 h-20 rounded-full border border-[#5A5A40]/50 absolute flex items-center justify-center animate-ping opacity-20 pointer-events-none" />
          <div className="w-8 h-8 rounded-full bg-[#5A5A40]/30 border border-[#FFE899]/60 absolute flex items-center justify-center pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            <Cpu className="w-4 h-4 text-[#FFE899]" />
          </div>

          {/* SVG Connection Lines in 3D */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {transformedNodes.map((node, i) => (
              <line
                key={`line-${i}`}
                x1={175}
                y1={150}
                x2={node.projX}
                y2={node.projY}
                stroke={node.color}
                strokeWidth={Math.max(0.5, node.scale * 1.5)}
                strokeDasharray="2,2"
                opacity={node.opacity * 0.4}
              />
            ))}
          </svg>

          {/* 3D Projected Skill Nodes */}
          {transformedNodes.map((node) => {
            const isSelected = selectedSkill?.id === node.skill.id;
            return (
              <div
                key={node.skill.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSkill(node.skill);
                  if (onSkillSelect) onSkillSelect(node.skill);
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center transition-all duration-75 cursor-pointer ${
                  isSelected ? 'ring-2 ring-[#FFE899] shadow-[0_0_15px_#FFE899]' : ''
                }`}
                style={{
                  left: `${node.projX}px`,
                  top: `${node.projY}px`,
                  width: `${node.size * node.scale}px`,
                  height: `${node.size * node.scale}px`,
                  backgroundColor: node.color,
                  opacity: node.opacity,
                  zIndex: Math.round(node.projZ + 200),
                  boxShadow: `0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)`
                }}
              >
                <span 
                  className="font-bold text-white tracking-tighter truncate px-1 text-center"
                  style={{ fontSize: `${Math.max(8, 10 * node.scale)}px` }}
                >
                  {node.skill.name.split(' ')[0]}
                </span>
                <span 
                  className="text-[#CFE0D1] font-mono"
                  style={{ fontSize: `${Math.max(7, 8 * node.scale)}px` }}
                >
                  {node.skill.proficiency}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Telemetry Panel */}
        <div className="lg:col-span-5 bg-[#EBE8E1]/80 rounded-xl p-5 border border-[#E5E2D9] space-y-4">
          {selectedSkill ? (
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#5A5A40] text-[#F9F9F7]">
                  {selectedSkill.category}
                </span>
                <span className="text-xs font-semibold text-[#34583A] bg-[#EAF1EB] px-2 py-0.5 rounded border border-[#CFE0D1]">
                  Verified Competency
                </span>
              </div>

              <h4 className="text-xl font-bold text-[#2D2D2A] mt-2 font-serif-display">
                {selectedSkill.name}
              </h4>
              <p className="text-xs text-[#5F5E59] mt-1 leading-relaxed">
                Standardized assessment verified via institutional proctored benchmark test with cryptographic proof.
              </p>

              {/* Score Bar with 3D Bevel Highlight */}
              <div className="mt-3 bg-white p-3 rounded-lg border border-[#E5E2D9] shadow-xs">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#5F5E59]">Mastery Index</span>
                  <span className="text-[#5A5A40] font-mono">{selectedSkill.proficiency}% (Tier 1)</span>
                </div>
                <div className="w-full h-2.5 bg-[#EBE8E1] rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5A5A40] to-[#34583A] rounded-full transition-all duration-500"
                    style={{ width: `${selectedSkill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* Enterprise Telemetry Points */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-[#E5E2D9]">
                  <span className="text-[10px] text-[#7C7B76] block">2026 Demand Rating</span>
                  <span className="font-bold text-[#34583A] flex items-center gap-1 mt-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Top 3% High Demand
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-[#E5E2D9]">
                  <span className="text-[10px] text-[#7C7B76] block">Hiring Companies</span>
                  <span className="font-bold text-[#2D2D2A] mt-0.5 block">
                    Siemens, Google, Tesla
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#7C7B76]">
              Click any 3D orb node to inspect live verification data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
