"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDappApi } from "./use-dapp-api";
import { handleSSEEvent } from "../lib/sse-event-handler";
import type { EventPayload } from "@/shared/api/client";

interface UseSSEStreamOptions {
  enabled?: boolean;
  onError?: (error: Error) => void;
}

/**
 * Hook for connecting to SSE stream and handling events
 * Automatically invalidates TanStack Query cache based on event types
 */
export const useSSEStream = (options: UseSSEStreamOptions = {}) => {
  const { enabled = true, onError } = options;
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const connect = () => {
      // Clean up existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventsUrl = useDappApi.eventsUrl;
      const eventSource = new EventSource(eventsUrl, {
        withCredentials: true,
      });

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("SSE connection opened");
        reconnectAttemptsRef.current = 0;
      };

      // Handle named SSE events (weekly-compound:update, user:update, tvl:update)
      const eventTypes: Array<
        "weekly-compound:update" | "user:update" | "tvl:update"
      > = ["weekly-compound:update", "user:update", "tvl:update"];

      eventTypes.forEach((eventType) => {
        eventSource.addEventListener(eventType, (event: MessageEvent) => {
          try {
            const data = event.data ? JSON.parse(event.data) : {};
            const payload: EventPayload = {
              type: eventType,
              data,
            };
            console.log(`[SSE] Received event: ${eventType}`, data);
            handleSSEEvent(payload, { queryClient });
          } catch (error) {
            console.error(
              `Failed to parse SSE event ${eventType}:`,
              error,
              event.data
            );
          }
        });
      });

      eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);

        if (eventSource.readyState === EventSource.CLOSED) {
          // Connection closed, attempt to reconnect
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current += 1;
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, reconnectDelay);
          } else {
            console.error("Max reconnect attempts reached");
            if (onError) {
              onError(new Error("SSE connection failed after max attempts"));
            }
          }
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [enabled, queryClient, onError]);
};
