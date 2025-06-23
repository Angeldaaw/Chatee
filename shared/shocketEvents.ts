// shared/SocketEvents.ts

export const SOCKET_EVENTS = {
    CHAT_MESSAGE: "message:chat",
    SERVER_MESSAGE: "server:message",
    USER_JOINED: "user:joined",
    USER_DISCONNECTED: "disconnect",
    SERVER_CONNECTION: "connection"
} as const;