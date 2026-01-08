import { useState, useEffect, useRef } from "react";

type MousePos = { X: number; Y: number; };
const BallData = [
  { size: 10, color: "#AA4586", speed: 0.06 },
  { size: 5, color: "#A9FFCB", speed: 0.1 },
];

export default function App() {
  const [mouse, setMouse] = useState<MousePos>({ X: 0, Y: 0 });

  return (
    <div
      className="relative h-screen w-full bg-black"
      onMouseMove={(e) => setMouse({ X: e.clientX, Y: e.clientY })}
    >
      {BallData.map((ball) => (
        <Ball key={ball.color} mouse={mouse} color={ball.color} size={ball.size} speed={ball.speed} />
      ))}
    </div>
  );
}

type BallProps = { mouse: MousePos; color: string; size: number; speed: number; };

function Ball({ mouse, color, size, speed }: BallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ X: 0, Y: 0 });

  useEffect(() => {
    let anim: number;

    const loop = () => {
      pos.current.X += (mouse.X - pos.current.X) * speed;
      pos.current.Y += (mouse.Y - pos.current.Y) * speed;

      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.X - size * 2}px, ${pos.current.Y - size * 2}px)`;
      }

      anim = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(anim);
  }, [mouse]);

  return (
    <div
      ref={ref}
      style={{
        width: size * 4,
        height: size * 4,
        backgroundColor: color,
        position: "absolute",
        borderRadius: "50%",
      }}
    ></div>
  );
}
