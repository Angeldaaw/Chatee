import mongoose from "mongoose";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI;
        if(!uri) throw new Error("No se encontró MONGODB_URI en el archivo .env");
        await mongoose.connect(uri);
    } 
    catch(error) {
        console.error('❌ Error al conectar con MongoDB:', error);
    }
}