import { useEffect, useRef, useState } from "react";

interface UseAnimatedValueOptions {
  duration?: number; // Duration in milliseconds
  easing?: (t: number) => number; // Easing function (0-1 -> 0-1)
}

const defaultEasing = (t: number): number => {
  // Ease out cubic
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Hook for animating numeric values
 * Animates from current value to target value smoothly
 */
export const useAnimatedValue = (
  targetValue: number | string | undefined,
  options: UseAnimatedValueOptions = {}
): string => {
  const { duration = 1500, easing = defaultEasing } = options;
  const [displayValue, setDisplayValue] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const isFirstRenderRef = useRef<boolean>(true);
  const previousTargetRef = useRef<number | null>(null);

  useEffect(() => {
    const target = targetValue
      ? typeof targetValue === "string"
        ? parseFloat(targetValue) || 0
        : targetValue
      : 0;

    // If target hasn't changed, don't animate
    if (previousTargetRef.current === target && !isFirstRenderRef.current) {
      return;
    }

    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    // Set start value
    if (isFirstRenderRef.current) {
      // First render: start from 0
      startValueRef.current = 0;
      isFirstRenderRef.current = false;
    } else {
      // Subsequent renders: start from current display value
      startValueRef.current = displayValue;
    }

    const startTime = performance.now();
    startTimeRef.current = startTime;
    previousTargetRef.current = target;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) return;

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const currentValue =
        startValueRef.current +
        (target - startValueRef.current) * easedProgress;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly at target value
        setDisplayValue(target);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [targetValue, duration, easing, displayValue]);

  return displayValue.toString();
};

