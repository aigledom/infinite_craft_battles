const express = require('express');
const router = express.Router();
const randomWordsController = require("../controllers/randomWordsController");

//Ruta para obtener palabras aleatorias
router.get("/", randomWordsController.getRandomWords);

//Exporta las rutas
module.exports = router;
