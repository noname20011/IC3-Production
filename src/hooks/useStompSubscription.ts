import { useEffect, useRef } from "react";

import type { StompSubscription } from "@stomp/stompjs";

import { stompClient } from "@/api/socket/stompClient";

interface UseStompSubscriptionOptions {
  enabled?: boolean;
}

export const useStompSubscription = <T,>(
  topic: string,
  onMessageReceived: (data: T) => void,
  options?: UseStompSubscriptionOptions
) => {
  const subscriptionRef =
    useRef<StompSubscription | null>(null);

  const callbackRef =
    useRef(onMessageReceived);

  const enabled =
    options?.enabled ?? true;

  /**
   * Luôn giữ callback mới nhất
   */
  useEffect(() => {
    callbackRef.current =
      onMessageReceived;
  }, [onMessageReceived]);

  useEffect(() => {
    if (!enabled || !topic) {
      return;
    }

    let mounted = true;

    const subscribe = () => {
      if (!mounted) {
        return;
      }

      if (!stompClient.connected) {
        console.log(
          "⏳ STOMP chưa connected:",
          topic
        );

        return;
      }

      /**
       * Không subscribe trùng
       */
      if (subscriptionRef.current) {
        return;
      }

      console.log(
        "📡 SUBSCRIBE:",
        topic
      );

      subscriptionRef.current =
        stompClient.subscribe(
          topic,
          (message) => {
            console.log(
              "📨 STOMP MESSAGE:",
              message.body
            );

            try {
              const payload =
                JSON.parse(message.body);

              callbackRef.current(
                payload
              );
            } catch (error) {
              console.error(
                "❌ Parse STOMP message failed:",
                error
              );
            }
          }
        );
    };

    /**
     * Nếu đã connected thì subscribe ngay.
     */
    subscribe();

    /**
     * Vì hook có thể mount trước khi
     * STOMP connected nên kiểm tra connection.
     */
    const interval = setInterval(() => {
      if (
        stompClient.connected &&
        !subscriptionRef.current
      ) {
        subscribe();
      }
    }, 500);

    return () => {
      mounted = false;

      clearInterval(interval);

      console.log(
        "🧹 UNSUBSCRIBE:",
        topic
      );

      subscriptionRef.current?.unsubscribe();

      subscriptionRef.current = null;
    };
  }, [topic, enabled]);
};