import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = `https://ic3-3-production.vercel.app/ws-leaderboard`;
// const SOCKET_URL = `${import.meta.env.VITE_API_URL.replace("/api/v1/", "")}/ws-leaderboard`;

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(SOCKET_URL),
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// Kích hoạt kết nối ngay khi app load (hoặc gọi sau khi login)
stompClient.activate();