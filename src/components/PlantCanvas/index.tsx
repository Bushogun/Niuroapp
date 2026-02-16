import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaIndustry } from "react-icons/fa";
import { FaFan } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import type { RootState } from "../../state/store";
import type { HealthLevel } from "../../constants/healthStatus";
import { healthStyles } from "../../constants/healthStyles";
import { healthStatus } from "../../constants/healthStatus";
import type { Machine, HealthChangeEvent } from "../../interfaces/IMachine";

interface CanvasNode {
  id: number;
  x: number;
  y: number;
  radius: number;
  name: string;
  health: HealthLevel;
}

const createIconImage = async (
  Icon: React.ComponentType<any>,
  size = 40,
  color = "#111"
): Promise<HTMLImageElement> => {
  const svgString = renderToString(<Icon size={size} color={color} />);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.src = url;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  URL.revokeObjectURL(url);
  return img;
};

const getMachineHealth = (machine: Machine): HealthLevel => {
  const healthEvents = machine.events.filter(
    (e): e is HealthChangeEvent => e.type === "health_change"
  );

  if (!healthEvents.length) return 0;

  const latest = healthEvents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return latest.data.current_health as HealthLevel;
};

export default function PlantCanvas({ machines }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevSizeRef = useRef({ width: 0, height: 0 });

  const [compressorImg, setCompressorImg] = useState<HTMLImageElement | null>(null,);
  const [defaultImg, setDefaultImg] = useState<HTMLImageElement | null>(null);

  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [activeNode, setActiveNode] = useState<CanvasNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const [draggingId, setDraggingId] = useState<number | null>(null);

useEffect(() => {
  const loadIcons = async () => {
    const comp = await createIconImage(FaFan, 40, "#10b981");
    const def = await createIconImage(FaIndustry, 36, "#2563eb");

    setCompressorImg(comp);
    setDefaultImg(def);
  };

  loadIcons();
}, []);

useEffect(() => {
  if (!compressorImg || !defaultImg) return;
  draw();
}, [nodes, size, compressorImg, defaultImg]);


  useEffect(() => {
    if (!machines.length) return;

    setNodes(
      machines.map((m, i) => ({
        id: m.id,
        name: m.name,
        x: 80 + i * 120,
        y: 120,
        radius: 28,
        health: getMachineHealth(m)
      })),
    );
  }, [machines]);

  useEffect(() => {
    const resize = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const width = containerRef.current.offsetWidth;
      const height = 300;

      const dpr = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      const prev = prevSizeRef.current;

      if (prev.width && prev.height) {
        const scaleX = width / prev.width;
        const scaleY = height / prev.height;

        setNodes((prevNodes) =>
          prevNodes.map((n) => ({
            ...n,
            x: n.x * scaleX,
            y: n.y * scaleY,
          })),
        );
      }

      prevSizeRef.current = { width, height };
      setSize({ width, height });
    };

    resize();

    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener("resize", resize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const GRID_SIZE = 40;

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let x = 0; x < size.width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size.height);
      ctx.stroke();
    }

    for (let y = 0; y < size.height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size.width, y);
      ctx.stroke();
    }
  };

  
const drawCompressorIcon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  if (!compressorImg) return;

  ctx.drawImage(compressorImg, x - 20, y - 20, 40, 40);
};

const drawDefaultNode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  if (!defaultImg) return;

  ctx.drawImage(defaultImg, x - 18, y - 18, 36, 36);
};

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size.width, size.height);

    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, size.width, size.height);

    drawGrid(ctx);

    nodes.forEach((node) => {
      const name = node.name.toLowerCase();

      if (name.includes("bomba")) {
        drawDefaultNode(ctx, node.x, node.y);
      } else if (name.includes("compresor")) {
        drawCompressorIcon(ctx, node.x, node.y);
      } else {
        drawDefaultNode(ctx, node.x, node.y);
      }

      ctx.fillStyle = "#111";
      ctx.font = "12px sans-serif";
      ctx.fillText(node.name, node.x - 30, node.y + 38);
    });
  };

  useEffect(() => {
    draw();
  }, [nodes, size]);

  const getNodeAtPosition = (x: number, y: number) => {
    return nodes.find((node) => {
      const dx = x - node.x;
      const dy = y - node.y;
      return Math.sqrt(dx * dx + dy * dy) < node.radius;
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const found = getNodeAtPosition(x, y);

    if (found) {
      setDraggingId(found.id);
      setActiveNode(found);
      setTooltipPos({ x, y });
    } else {
      setActiveNode(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggingId === null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingId ? { ...n, x, y } : n)),
    );

    setTooltipPos({ x, y });
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  return (
    <div ref={containerRef} className="w-full relative">
      <canvas
        ref={canvasRef}
        className="w-full rounded-xl border bg-white touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      {activeNode && (
  <div
    className={`
      absolute 
      shadow-xl 
      border-2 
      rounded-xl 
      p-3 
      text-sm 
      z-50 
      pointer-events-none
      ${healthStyles[activeNode.health].card}
    `}
    style={{
      left: tooltipPos.x,
      top: tooltipPos.y - 60,
      transform: "translate(-50%, -100%)",
    }}
  >
    <div className="flex items-center gap-2 mb-1">
      <span
        className={`
          w-3 h-3 rounded-full 
          ${healthStyles[activeNode.health].badge}
        `}
      />
      <div className="font-semibold">{activeNode.name}</div>
    </div>

    <div className="text-xs opacity-70">
      ID: {activeNode.id}
    </div>

    <div className="text-xs font-medium mt-1">
      Estado: {healthStatus[activeNode.health]}
    </div>
  </div>
)}
    </div>
  );
}
