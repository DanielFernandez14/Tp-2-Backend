import {connect} from "mongoose";
process.loadEnvFile();

const URI_DB = process.env.URI_DB || "";

const connectMongoDb = async () => {
    try {
        await connect(URI_DB)
        console.log("✅ Conexión exitosa a MongoDB");
    } catch (error) {
        console.log("📛 Error al conectar a MongoDB:");
        console.error(error);
    }
}

export {connectMongoDb};