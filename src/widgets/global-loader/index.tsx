"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface GlobalLoaderProps {
  readyDOM: boolean;
  readyData: boolean;
  readyCanvas: boolean;
}

export const GlobalLoader = ({
  readyDOM,
  readyData,
  readyCanvas,
}: GlobalLoaderProps) => {
  const [progress, setProgress] = useState(0);

  const allReady = readyDOM && readyData && readyCanvas;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 30 ? 15 : prev < 70 ? 8 : 3;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (allReady && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const increment = prev < 30 ? 15 : prev < 70 ? 8 : 3;
          return Math.min(prev + increment, 100);
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [allReady, progress]);

  return (
    <div className={styles.loader}>
      <h1 className={styles.h1}>
        <span className={styles.h1_accent}>MON</span>MINER
      </h1>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.progressText}>{Math.floor(progress)}%</div>
    </div>
  );
};
