import { useEffect } from "react";
import { stompClient } from "./stompClient";

interface Props {
  children: React.ReactNode;
}

export const StompProvider = ({ children }: Props) => {
  useEffect(() => {
    if (!stompClient.active) {
      console.log("🚀 Activating STOMP...");

      stompClient.activate();
    }

    return () => {
      console.log("🛑 Deactivating STOMP...");

      stompClient.deactivate();
    };
  }, []);

  return <>{children}</>;
};