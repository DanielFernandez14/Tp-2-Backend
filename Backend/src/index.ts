import express, { request } from 'express';
import { connectMongoDb } from './config/mongo';
import { Schema, model } from 'mongoose';
import cors from 'cors';

process.loadEnvFile();

//1234
const PORT = process.env.PORT;

const bookSchema = new Schema({

    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    publishedYear: {type: Number},
    genre: { type: String},
    available: { type: Boolean, default: true }

})

const Book = model("Book", bookSchema);

const app = express();
app.use(express.json());
app.use(cors());


const getAllBooks = async () => {
    try {
        const books = await Book.find();
        return {
            success: true,
            data: books,
            message: "Libros obtenidos correctamente"
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: `Error al obtener los libros: ${err.message}`
        }
    }
}

app.get("/api/books", async (request, response): Promise<any> => {
    try {
        const books = await Book.find()
        return response.json({
            success: true,
            data: books,
            message: "Libros obtenidos correctamente"
        })
    } catch (error) {
        const err = error as Error
        return response.json({
            success: false,
            message: `Error al obtener los libros: ${err.message}`
        })
    }
});

app.post("/api/books", async (request, response): Promise<any> => {
    try { 
        const body = request.body;
        const {title, author, publishedYear, genre} = body;
        if (!title || !author) {
            return response.status(400).json({
                success: false,
                message: "Data invalida",
            });
        }
        const newBook = new Book({
            title,
            author,
            publishedYear,
            genre
        });
        const savedBook = await newBook.save();
        return response.status(201).json({
            succcess: true, 
            data: savedBook,
            message: "Libro agregado correctamente"})
    } catch (error) {
        const err = error as Error
        response.status(500).json({
            success: false,
            message: `Error al agregar el libro: ${err.message}`
        })
    }})

app.delete("/api/books/:id", async (request, response): Promise<any> => { 
    try {
        const req = request.params.id
        const deletedBook = await Book.findByIdAndDelete(req);
        if (!deletedBook) {
            return response.status(404).json({
                success: false,
                message: "Libro no encontrado"
            })
        }
        response.json({
            success: true,
            message: "Libro eliminado correctamente",})
    } catch (error) {
        const err = error as Error
        return response.status(500).json({
            success: false,
            message: `Error al eliminar el libro: ${err.message}`
        })
    }
})

app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
    connectMongoDb()
});

