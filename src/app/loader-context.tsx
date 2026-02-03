"use client";

import { createContext, useContext, ReactNode } from "react";

interface LoaderContextType {
  setReadyDOM: (ready: boolean) => void;
  setReadyData: (ready: boolean) => void;
  setReadyCanvas: (ready: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoaderContext = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoaderContext must be used within LoaderProvider");
  }
  return context;
};

export { LoaderContext };
export type { LoaderContextType };

