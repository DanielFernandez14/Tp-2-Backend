const list = document.getElementById("booksList");
const form = document.getElementById("form");

    const fetchingBooks = async () => {
        try {
            const response = await fetch("http://localhost:1234/api/books");
            const responseToJson = await response.json();

            list.innerHTML = "";

            responseToJson.data.reverse().forEach((book) => {
            
            const div = document.createElement("div")
            div.classList.add("book")
            div.innerHTML = `
            <h2>${book.title}</h2>
            <p><b>Autor</b>: ${book.author}</p>
            <p><b>Género</b>: ${book.genre}</p>
            <p><b>Año</b>: ${book.publishedYear}</p>
            <p><b>Disponibilidad</b>: ${book.available ? "Disponible" : "No disponible"}</p>
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
        try {
            console.log("Agregando libro...");

            const title = document.getElementById("title");
            const author = document.getElementById("author");
            const publishedYear = document.getElementById("year");
            const genre = document.getElementById("genre");

            const newBook = {
                title: title.value,
                author: author.value,
                publishedYear: Number(publishedYear.value),
                genre: genre.value,
            }

            const response = await fetch("http://localhost:1234/api/books", {
                method: "POST",
                body: JSON.stringify(newBook),
                headers: { "Content-Type": "application/json" }
            });

            title.value = "";
            author.value = "";
            publishedYear.value = "";
            genre.value = "";

            await fetchingBooks();
        } catch (error) {
            console.error("Error al agregar libro:", error);
            alert("Error al agregar libro. Por favor, inténtelo de nuevo.", error);
        }
    }

    form.addEventListener("submit", addNewBook)

    fetchingBooks();
    