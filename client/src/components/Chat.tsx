import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import "./Chat.css";
import type { ChatMessage } from "../../../shared/types";
import { formatTime } from "../utils/formatTime";
import LoginPrompt from "./LoginPrompt";
import ChatWindow from "./ChatWindow";
import { SOCKET_EVENTS } from "../../../shared/shocketEvents";

export default function Chat() {
    const [username, setUsername] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [showPrompt, setShowPrompt] = useState<boolean>(true);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on(SOCKET_EVENTS.CHAT_MESSAGE, (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on(SOCKET_EVENTS.SERVER_MESSAGE, (msg:string) => {
            const systemMessage: ChatMessage = {
              text: msg,
              username: "Sistema",
              timestamp: new Date().toISOString()
            }

            setMessages((prev) => [...prev, systemMessage]);
        });

        // Limpieza del listener al desmontar el componente
        return () => {
            socket.off(SOCKET_EVENTS.CHAT_MESSAGE);
            socket.off(SOCKET_EVENTS.SERVER_MESSAGE)
        }

    }, []);

    // Scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    });

    // Login
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (username.trim()) {
        setShowPrompt(false);
      }
    };

    useEffect(() => {
    if (!showPrompt && username) {
        socket.emit(SOCKET_EVENTS.USER_JOINED, username);
      }
    }, [showPrompt, username]);

    // Envía el mensaje
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim()) {
        const msgToSend: ChatMessage = {
          text: message,
          username: username,
          timestamp: new Date().toISOString(),
        };
        socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, msgToSend);
        setMessage('');
      }
    };

    // Pide usuario si no se ha logeado
    if (showPrompt) {
      return (<LoginPrompt 
        username={username} 
        onChange={(e) => setUsername(e.target.value)} 
        onSubmit={handleLogin} />)
    } else {
      return (<ChatWindow 
        message={message} 
        messages={messages} 
        onMessageChange={(e) => setMessage(e.target.value)}
        onSubmit={handleSubmit}
        chatEndRef={chatEndRef} 
        formatTime={formatTime} />)
    }

}