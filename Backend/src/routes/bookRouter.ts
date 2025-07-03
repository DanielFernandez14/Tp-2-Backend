//valida metodo y url
import { Router } from "express";
import { Book } from "../models/bookModel";
import { get } from "mongoose";
import { createBook, deleteBook, getAllBooks, updateBook } from "../controllers/bookController";

const bookRouter = Router();


bookRouter.get("/", getAllBooks);

bookRouter.post("/", createBook);

bookRouter.patch("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);


export { bookRouter }