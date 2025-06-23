import { Server, Socket } from "socket.io";
import { Message } from "./models/Message";
import type { ChatMessage } from "../../shared/types";
import { SOCKET_EVENTS } from "../../shared/shocketEvents";

export function setupSocket(io: Server) {
    io.on(SOCKET_EVENTS.SERVER_CONNECTION, async (socket) => {
        // Notificar usuario conectado/desconectado
        let currentUser = "";
        socket.on(SOCKET_EVENTS.USER_JOINED, (username: string) => {
            currentUser = username;
            io.emit(SOCKET_EVENTS.SERVER_MESSAGE, `${currentUser} se ha conectado`);
        });

        socket.on(SOCKET_EVENTS.USER_DISCONNECTED, () => {
            if (currentUser) {
                io.emit(SOCKET_EVENTS.SERVER_MESSAGE, `${currentUser} se ha desconectado`);
            }
        });

        // Enviar historial de mensajes al nuevo cliente
        const mensajesAnteriores = await Message.find().sort({ timestamp: 1 });
        mensajesAnteriores.forEach((m) => {
            EmitMessage(
                {
                    text: String(m.text),
                    username: String(m.username),
                    timestamp: new Date(m.timestamp).toISOString(),
                },
                socket
            );
        });

        // Escucha mensajes entrantes
        socket.on(SOCKET_EVENTS.CHAT_MESSAGE, async (msg: ChatMessage) => {
            // console.log("Mensaje recibido: ", msg)
            const { text, username, timestamp } = msg;

            // Validación
            if (typeof text !== 'string' || typeof username !== 'string') {
                //console.error('❌ Formato inválido:', msg);
                return;
            }

            try{
                // Guardar en DB
                await Message.create({
                    text: text.trim(),
                    username: username.trim(),
                    timestamp: timestamp ? new Date(timestamp) : new Date(),
                });
                
                // Reenviar mensaje a todos los clientes
                EmitMessage(msg, socket)
            } catch (err) {
                console.error("❌ Error al guardar mensaje:", err);
            }
        });
    });
}

function EmitMessage(message: ChatMessage, socket: Socket) {
    socket.emit(SOCKET_EVENTS.CHAT_MESSAGE, {
        text: message.text,
        username: message.username,
        timestamp: message.timestamp,
    });
}