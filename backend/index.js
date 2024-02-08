import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";


const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//CONFIGURAR CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if ( whitelist.includes(origin)){
            //SI ORIGIN ESTA EN WHITELIST PUEDE CONSULTAR LA API
            callback(null, true);
        } else {
           //NO ESTA PERMITIDO EL REQUEST
           callback(new Error("Error de Cors"));
        }
    },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});