import { Book } from "../models/bookModel";
import { request, Request, response, Response } from "express";

const getBookById = async (request: Request, response: Response): Promise<any> => {
    try {
    const id = request.params.id;
    const book = await Book.findById(id);
    if (!book) {
        return response.status(404).json({
        success: false,
        message: "Libro no encontrado"
        });
    }
    return response.json({
        success: true,
        data: book,
        message: "Libro obtenido correctamente"
    });
    } catch (error) {
    const err = error as Error;
    return response.status(500).json({
        success: false,
        message: `Error al obtener el libro: ${err.message}`
    });
    }
};

export { getBookById };

const getAllBooks = async (request: Request, response: Response): Promise<any> => {
        try {
            const books = await Book.find();
            return response.json({
                success: true,
                data: books,
                message: "Libros obtenidos correctamente"
            });
        } catch (error) {
            const err = error as Error;
            return response.status(500).json({
                success: false,
                message: `Error al obtener los libros: ${err.message}`
            });
        }
    };

    export { getAllBooks };

const createBook = async (request: Request, response: Response): Promise<any> => {
    try {
        const body = request.body;
        const { title, author, publishedYear, genre } = body;
        if (!title || !author) {
            return response.status(400).json({
                success: false,
                message: "Datos inválidos"
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
            success: true,
            data: savedBook,
            message: "Libro agregado correctamente"
        });
    } catch (error) {
        const err = error as Error;
        return response.status(500).json({
            success: false,
            message: `Error al agregar el libro: ${err.message}`
        });
    }
}

    export { createBook };

const updateBook = async (request: Request, response: Response): Promise<any> => {
    try {
        const id = request.params.id;
        const body = request.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return response.status(404).json({
                success: false,
                message: "Libro no encontrado"
            });
        }

        return response.json({
            success: true,
            data: updatedBook,
            message: "Libro actualizado correctamente"
        });
    } catch (error) {
        const err = error as Error;
        return response.status(500).json({
            success: false,
            message: `Error al actualizar el libro: ${err.message}`
        });
    }
}

    export { updateBook };

const deleteBook = async (request: Request, response: Response): Promise<any> => {
    try {
        const id = request.params.id;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return response.status(404).json({
                success: false,
                message: "Libro no encontrado"
            });
        }
        return response.json({
            success: true,
            message: "Libro eliminado correctamente"
        });
    } catch (error) {
        const err = error as Error;
        return response.status(500).json({
            success: false,
            message: `Error al eliminar el libro: ${err.message}`
        });
    }
}

    export { deleteBook };