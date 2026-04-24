import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private isConnecting = false;

  connect(): Socket | null {
    // 1. Jodi agei connected thake
    if (this.socket?.connected) {
      return this.socket;
    }

    if (this.isConnecting) {
      return this.socket;
    }

    this.isConnecting = true;

    // 2. Auth Data collection
    const userId = localStorage.getItem("userId") || "";
    const token = localStorage.getItem("token") || "";

    // 3. Socket Initialization
    // Gateway-te namespace nai, tai url-er pore kichu add korar dorkar nei
  this.socket = io(`${import.meta.env.VITE_PUBLIC_API_URL}`, {
    // ekhane '/notifications' thakle seta namespace hoye jay, ja backend-e nai
    query: { userId },
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
  });

    // 4. Basic Event Listeners
    this.socket.on("connect", () => {
      console.log("✅ Notifications Socket connected:", this.socket?.id);
      this.isConnecting = false;
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Notifications Socket disconnected");
      this.isConnecting = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
      this.isConnecting = false;
    });

    return this.socket;
  }

  // 5. Notification Listeners (Gateway emission-er sathe match kore)

  // Specific User Notification-er jonno
  onNotification(callback: (data: any) => void) {
    this.socket?.on("notification", callback);
  }

  // Admin Notification-er jonno
  onAdminNotification(callback: (data: any) => void) {
    this.socket?.on("admin-notification", callback);
  }

  // Listener off korar jonno (Cleanup)
  offNotification() {
    this.socket?.off("notification");
    this.socket?.off("admin-notification");
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnecting = false;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketService = new SocketService();
