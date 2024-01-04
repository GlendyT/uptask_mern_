import express from "express";
const router = express.Router();

import { registrar } from "../controllers/usuarioController.js";

//Autenticacion, Registro y Confirmacion de Usuario

router.post("/", registrar); //Crear un nuevo usuario





export default router;