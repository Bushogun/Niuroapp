import { useEffect, useRef, useState } from "react";

interface NodeItem {
  id: string;
  x: number;
  y: number;
  radius: number;
  name: string;
  status: "online" | "offline" | "warning";
}

const nodes: NodeItem[] = [
  { id: "1", x: 120, y: 120, radius: 25, name: "Banda A", status: "online" },
  { id: "2", x: 300, y: 180, radius: 25, name: "Robot Soldador", status: "warning" },
  { id: "3", x: 480, y: 100, radius: 25, name: "Control PLC", status: "offline" },
];

export default function PlantCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [hovered, setHovered] = useState<NodeItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const getColor = (status: NodeItem["status"]) => {
    if (status === "online") return "#22c55e";
    if (status === "warning") return "#f59e0b";
    return "#ef4444";
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 800, 400);

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, 800, 400);

    ctx.strokeStyle = "#e5e7eb";
    for (let i = 0; i < 800; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 400);
      ctx.stroke();
    }

    for (let i = 0; i < 400; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(800, i);
      ctx.stroke();
    }

    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = getColor(node.status);
      ctx.fill();

      ctx.fillStyle = "#111";
      ctx.font = "12px sans-serif";
      ctx.fillText(node.name, node.x - 30, node.y + 40);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    draw(ctx);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found: NodeItem | null = null;

    nodes.forEach((node) => {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < node.radius) {
        found = node;
      }
    });

    setHovered(found);
    setTooltipPos({ x: mouseX, y: mouseY });
  };

  return (
    <div className="relative w-fit">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
        className="border rounded-lg bg-white"
      />

      {hovered && (
        <div
          className="absolute bg-white shadow-lg border rounded-xl p-3 text-sm"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y + 10,
          }}
        >
          <div className="font-semibold">{hovered.name}</div>
          <div>Estado: {hovered.status}</div>
          <div>ID: {hovered.id}</div>
        </div>
      )}
    </div>
  );
}
