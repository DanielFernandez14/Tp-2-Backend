# BACKEND
# 📚 API de Biblioteca Digital con Mongoose

Este módulo permite conectar a una base de datos MongoDB y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de libros. Está implementado usando **Express**, **Mongoose** y **TypeScript**, siguiendo el patrón **MVC**.

---

## 📦 Requisitos

- Node.js  
- MongoDB local  
- TypeScript  
- Archivo `.env` con `PORT` y `URI_DB` de conexión  

---

## ⚙️ Configuración Inicial

Instalar dependencias:

```bash
npm install express mongoose cors
npm install --save-dev typescript ts-node-dev @types/express @types/node


Crear un archivo .env en la raíz del proyecto con las siguientes variables: 
PORT=1234
URI_DB=mongodb://localhost:27017/db-api-utn


Activar la carga de variables de entorno en tu proyecto con:
process.loadEnvFile()


📖 Estructura del Modelo:
const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  publishedYear: { type: Number },
  genre: { type: String },
  available: { type: Boolean, default: true }
})



📚 Endpoints Disponibles
📜 Listar Todos los Libros
GET /api/books
Devuelve todos los libros almacenados.

📃 Obtener Libro por ID
GET /api/books/:id
Devuelve un libro según su ID.

✅ Crear un Nuevo Libro
POST /api/books
Crea un nuevo libro.
Campos requeridos: title, author.

✏️ Actualizar un Libro
PATCH /api/books/:id
Actualiza cualquier campo del libro existente.

🔥 Eliminar un Libro
DELETE /api/books/:id
Elimina un libro por su ID.


🚀 Ejemplo de Uso:
const main = async () => {
  process.loadEnvFile()
  await connectMongoDb()

  // const newBook = await createBook({
  //   title: "1984",
  //   author: "George Orwell",
  //   publishedYear: 1949,
  //   genre: "Dystopian",
  // })

  const allBooks = await getBooks()
  console.log(allBooks)
}

main()



🧩 Scripts Disponibles
npm run dev → Ejecuta en modo desarrollo con reinicio automático.

npm run build → Compila TypeScript a JavaScript.

npm start → Ejecuta en producción.

🛠️ Errores Comunes
URI de conexión inválida.

Campos requeridos faltantes (title, author).

ID inválido o inexistente.

Conflicto por campo unique (título duplicado).

