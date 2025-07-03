import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/bookController";

const bookRouter = Router();

bookRouter.get("/:id", getBookById);

bookRouter.get("/", getAllBooks);

bookRouter.post("/", createBook);

bookRouter.patch("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);


export { bookRouter }