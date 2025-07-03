import express from 'express';
import { connectMongoDb } from './config/mongo';
import cors from 'cors';
import { bookRouter } from './routes/bookRouter';

process.loadEnvFile();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/books", bookRouter);


app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`);
    connectMongoDb();
});
