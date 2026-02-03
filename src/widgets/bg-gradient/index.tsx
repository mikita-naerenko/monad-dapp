"use client";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Plane } from "./components/plane";

export const BackgroundCanvas = () => {
  const hasDispatchedRef = useRef(false);

  return (
    <Canvas
      gl={{ alpha: true }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      onCreated={(state) => {
        const checkReady = () => {
          if (hasDispatchedRef.current) return;

          if (state.gl && state.scene) {
            hasDispatchedRef.current = true;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                const event = new CustomEvent("backgroundReady");
                window.dispatchEvent(event);
              });
            });
          } else {
            setTimeout(checkReady, 50);
          }
        };

        setTimeout(checkReady, 100);
      }}
    >
      <Plane />
    </Canvas>
  );
};
