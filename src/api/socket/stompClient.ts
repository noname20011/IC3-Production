import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = `${
  import.meta.env.VITE_API_URL.replace("/api/v1/", "")
}/ws-leaderboard`;

export const stompClient = new Client({
  webSocketFactory: () => {
    console.log("🔌 Creating SockJS:", SOCKET_URL);

    return new SockJS(SOCKET_URL);
  },

  reconnectDelay: 5000,

  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,

  debug: (message) => {
    console.log("[STOMP]", message);
  },
});

stompClient.onConnect = (frame) => {
  console.log("✅ STOMP CONNECTED");
  console.log("Headers:", frame.headers);
};

stompClient.onDisconnect = () => {
  console.log("❌ STOMP DISCONNECTED");
};

stompClient.onStompError = (frame) => {
  console.error("❌ STOMP ERROR");
  console.error("Headers:", frame.headers);
  console.error("Body:", frame.body);
};

stompClient.onWebSocketError = (error) => {
  console.error("❌ WEBSOCKET ERROR:", error);
};

stompClient.onWebSocketClose = (event) => {
  console.log("🔌 WEBSOCKET CLOSED:", event);
};