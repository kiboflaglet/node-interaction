import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const BallData = [
  { size: 12, color: "#AA4586", speed: 0.1 },
];

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative w-screen h-screen bg-black overflow-hidden"
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
    >
      {BallData.map((ball, i) => (
        <BlobBall key={i} mouse={mouse} ball={ball} />
      ))}
    </div>
  );
}

type Ball = { size: number; color: string; speed: number };
type BlobBallProps = { ball: Ball; mouse: { x: number; y: number } };

function BlobBall({ ball, mouse }: BlobBallProps) {
  const x = useRef(useMotionValue(mouse.x)).current;
  const y = useRef(useMotionValue(mouse.y)).current;

  // smooth spring following
  const sx = useSpring(x, { damping: 15, stiffness: 120 });
  const sy = useSpring(y, { damping: 15, stiffness: 120 });

  useEffect(() => {
    x.set(mouse.x);
    y.set(mouse.y);
  }, [mouse.x, mouse.y, x, y]);

  return (
    <motion.div
      style={{
        width: ball.size * 2,
        height: ball.size * 2,
        borderRadius: "50%",
        backgroundColor: ball.color,
        position: "absolute",
        x: sx,
        y: sy,
      }}
    />
  );
}
