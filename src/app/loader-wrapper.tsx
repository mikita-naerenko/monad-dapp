"use client";

import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { LoaderContext } from "./loader-context";
import { GlobalLoader } from "@/widgets/global-loader";

export const LoaderWrapper = ({ children }: PropsWithChildren) => {
  const [readyDOM, setReadyDOM] = useState(false);
  const [readyData, setReadyData] = useState(false);
  const [readyCanvas, setReadyCanvas] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const isReload = navigation?.type === "reload";
    const isFirstLoad =
      navigation?.type === "navigate" &&
      !sessionStorage.getItem("__loader_completed");

    if (isReload || isFirstLoad) {
      setTimeout(() => setShowLoader(true), 0);
    }
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();

    requestAnimationFrame(() => setReadyDOM(true));

    setTimeout(() => setReadyData(true), 0);

    const handleCanvasReady = () => setReadyCanvas(true);
    window.addEventListener("backgroundReady", handleCanvasReady);

    const timeout = setTimeout(() => setReadyCanvas(true), 5000);

    return () => {
      window.removeEventListener("backgroundReady", handleCanvasReady);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const allReady = readyDOM && readyData && readyCanvas;
    if (allReady) {
      setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("__loader_completed", "true");
      }, 0);
    }
  }, [readyDOM, readyData, readyCanvas, showLoader]);

  const allReady = readyDOM && readyData && readyCanvas;

  return (
    <LoaderContext.Provider
      value={{
        setReadyDOM,
        setReadyData,
        setReadyCanvas,
      }}
    >
      {showLoader && !allReady ? (
        <GlobalLoader
          readyDOM={readyDOM}
          readyData={readyData}
          readyCanvas={readyCanvas}
        />
      ) : (
        children
      )}
    </LoaderContext.Provider>
  );
};
