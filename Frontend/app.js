const list = document.getElementById("booksList");
const form = document.getElementById("form");
const btnSubmit = document.getElementById("btnSubmit");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const publishedYearInput = document.getElementById("year");
const genreInput = document.getElementById("genre");

let isEditing = false;

    const fetchingBooks = async () => {
        try {
            const response = await fetch("http://localhost:1234/api/books");
            const responseToJson = await response.json();
            
            list.innerHTML = "";

            responseToJson.data.reverse().forEach((book) => {
            // const { titleInput, authorInput, publishedYearInput, genreInput } = book;
            const div = document.createElement("div")
            div.classList.add("book")
            div.innerHTML = `
            <h2>${book.title}</h2>
            <p><b>Autor</b>: ${book.author}</p>
            <p><b>Género</b>: ${book.genre}</p>
            <p><b>Año</b>: ${book.publishedYear}</p>
            <p><b>Disponibilidad</b>: ${book.available ? "Disponible" : "No disponible"}</p>
            <button onclick="updateBook('${book.title}', '${book.author}', ${book.publishedYear}, '${book.genre}')" class="btn-update">Actualizar Libro</button>
            <button onclick="deleteBook('${book._id}')" class="btn-delete">Eliminar Libro</button>

            `
            list.appendChild(div);
        });
        } catch (error) {
            const list = document.createElement("div");
            list.innerHTML = `<h2 style='color: red; text-align: center;'>Error al obtener libros</h2>`;
            document.body.appendChild(list);
            console.error("Error al obtener libros:", error);
        }
    };

    const addNewBook = async (e) => {
        e.preventDefault();
        isEditing = false;
        try {
            if(isEditing === false) {
                console.log("Agregando libro...");

            const newBook = {
                title: titleInput.value,
                author: authorInput.value,
                publishedYear: Number(publishedYearInput.value),
                genre: genreInput.value,
            }
                

            const response = await fetch("http://localhost:1234/api/books", {
                method: "POST",
                body: JSON.stringify(newBook),
                headers: { "Content-Type": "application/json" }
            });
            
            titleInput.value = "";
            authorInput.value = "";
            publishedYearInput.value = "";
            genreInput.value = "";

            await fetchingBooks();
        } else { 

            
        }
        } catch (error) {
            console.error("Error al agregar libro:", error);
            alert("Error al agregar libro. Por favor, inténtelo de nuevo.", error);
        }
    }
    
    const updateBook = (title, author, publishedYear, genre) => {
        console.log("Actualizando libro...", title, author, publishedYear, genre);
        isEditing = true;
        btnSubmit.textContent = "Actualizar Libro";

        titleInput.value = title;
        authorInput.value = author;
        publishedYearInput.value = publishedYear;
        genreInput.value = genre;

        isEditing = false;
    }
        


    const deleteBook = async (id) => {
        try {
            if(!confirm("¿Estás seguro de que quieres eliminar este libro?")) {
                return;
            }
            const response = await fetch(`http://localhost:1234/api/books/${id}`, {
                method: "DELETE"
            });
            fetchingBooks();
            console.log("Libro eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar libro:", error);
        }
    }

    const sendQueryUpdate = async (id) => {
        const updateBook = {
            title: titleInput.value,
            author: authorInput.value,
            publishedYear: Number(publishedYearInput.value),
            genre: genreInput.value,
        }

            const response = await fetch(`http://localhost:1234/api/books/` + id, {
            method: "PATCH",
            body: JSON.stringify(updateBook),
            headers: { "Content-Type": "application/json" }
        })
            titleInput.value = "";
            authorInput.value = "";
            publishedYearInput.value = "";
            genreInput.value = "";

            fetchingBooks();
    }


    form.addEventListener("submit", addNewBook)

    fetchingBooks();
    