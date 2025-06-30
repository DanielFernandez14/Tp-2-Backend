import express from 'express';
import { connectMongoDb } from './config/mongo';


process.loadEnvFile();

//1234
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
    connectMongoDb()
});

