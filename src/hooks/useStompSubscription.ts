import { useEffect, useRef } from "react";
import { StompSubscription } from "@stomp/stompjs";
import { stompClient } from "@/api/socket/stompClient";

export const useStompSubscription = <T>(
  topic: string,
  onMessageReceived: (data: T) => void
) => {
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    if (!topic) return;

    const subscribe = () => {
      // tránh subscribe trùng
      if (subscriptionRef.current) return;

      subscriptionRef.current = stompClient.subscribe(
        topic,
        (message) => {
          const payload = JSON.parse(message.body);
          onMessageReceived(payload);
        }
      );
    };

    if (stompClient.connected) {
      subscribe();
    } else {
      const originalOnConnect = stompClient.onConnect;

      stompClient.onConnect = (frame) => {
        originalOnConnect?.(frame);
        subscribe();
      };
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
    };
  }, [topic]);
};