const list = document.getElementById("booksList");

    const fetchingBooks = async () => {
        try {
            const response = await fetch("http://localhost:1234/api/books");
            const responseToJson = await response.json();

            list.innerHTML = "";

            responseToJson.data.forEach((book) => {
            const li = document.createElement("li");
            li.textContent = book.title;
            list.appendChild(li);
        });
        } catch (error) {
        console.error("Error al obtener libros:", error);
        list.innerHTML = "<li>Error al cargar los libros.</li>";
        }
    };

    fetchingBooks();