import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GridShaderMaterial } from "./grid-shader-material";
import { useWindowSize } from "@/shared/lib/hooks/use-window-size";

extend({ GridShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    gridShaderMaterial: unknown;
  }
}

const getDotsCount = (width: number, height: number): [number, number] => {
  const dotSpacing = 30;

  const dotsX = Math.floor(width / dotSpacing);
  const dotsY = Math.floor(height / dotSpacing);

  return [dotsX, dotsY];
};

type GridShaderMaterialUniforms = {
  uTime: number;
  uResolution: [number, number];
  uScaleX: number;
  uScaleY: number;
};

export const Plane = () => {
  const materialRef = useRef<unknown>(null);
  const { width, height } = useWindowSize();
  const [resolution, setResolution] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    const updateResolution = () => {
      if (typeof window !== "undefined") {
        setResolution([
          window.innerWidth * window.devicePixelRatio,
          window.innerHeight * window.devicePixelRatio,
        ]);
      }
    };

    updateResolution();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateResolution);
      window.addEventListener("devicePixelRatio", updateResolution);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateResolution);
        window.removeEventListener("devicePixelRatio", updateResolution);
      }
    };
  }, []);

  useFrame(({ clock, gl }) => {
    const material = materialRef.current as GridShaderMaterialUniforms | null;

    if (material) {
      material.uTime = clock.getElapsedTime();
      material.uResolution = resolution;

      const [scaleX, scaleY] = getDotsCount(width, height);
      material.uScaleX = scaleX;
      material.uScaleY = scaleY;
    }

    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <gridShaderMaterial ref={materialRef} attach="material" />
    </mesh>
  );
};
