// src/hooks/useStompSubscription.ts
import { stompClient } from '@/api/socket/stompClient';
import { useEffect } from 'react';

export const useStompSubscription = <T>(
  topic: string, 
  onMessageReceived: (data: T) => void
) => {
  useEffect(() => {
    // Kiểm tra nếu client chưa kết nối thì đợi
    const subscribe = () => {
      stompClient.subscribe(topic, (message) => {
        const payload = JSON.parse(message.body);
        onMessageReceived(payload);
      });
    };

    if (stompClient.connected) {
      subscribe();
    } else {
      stompClient.onConnect = subscribe;
    }

    // Quan trọng: Phải unsubscribe khi component unmount để tránh leak bộ nhớ
    return () => {
      // Tìm và unsubscribe subscription hiện tại của topic này (nếu cần logic phức tạp hơn)
      // Với STOMP đơn giản, có thể lưu id subscription để hủy
    };
  }, [topic, onMessageReceived]);
};