import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupSocket } from './socket';
import { connectDB } from './database';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

connectDB()

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get("/", (_, res) => {
    res.send('Servidor de chat en tiempo real funcionando 🚀')
});

// Configura los sockets
setupSocket(io);

const PORT = 3000;

server.listen(PORT, () => {
    // console.log(`Servidor corriendo en http://localhost:${PORT}`);
})