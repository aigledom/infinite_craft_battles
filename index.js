const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();
const port = 3000;

//Establece la carpeta para las vistas
app.set("views", path.join(__dirname, "views"));
//Establece el motor de plantillas
app.set("view engine", "ejs");

//Ruta para obtener la palabra
app.get("/random-words", async (req, res) => {
  try {
    // Array para almacenar las palabras generadas
    var listaPalabras = new Array();
    //Lanza la web de la que se extraen las palabras aleatorias
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://gadgetmates.com/infinite-craft-random-word-generator"
    );
    //Espera a que el boton de aceptar cookies esté disponible y se hace clic en el
    await page.waitForSelector(".sc-qRumB.bcoUVc.amc-focus-first", {
      timeout: 3000,
    });
    await page.click(".sc-qRumB.bcoUVc.amc-focus-first");
    //Espera a que el boton esté disponible y se hace clic en él 9 veces para conseguir
    //las palabras con las que llenar la lista
    for (let i = 0; i < 9; i++) {
      await page.waitForSelector(
        "#infinite-craft-random-word-generator button",
        { timeout: 3000 }
      );
      await page.click("#infinite-craft-random-word-generator button");
      //Esparar a que la palabra se genere y se extrae despues
      await page.waitForSelector("#random-word-output");
      const palabraRandom = await page.evaluate(() => {
        return document.querySelector("#random-word-output").textContent.trim();
      });
      // Agrega la palabra al array
      listaPalabras[i] = palabraRandom;
    }
    //Se cierra el navegador una vez acaba el proceso
    await browser.close();
    // Renderizar la vista con el array de palabras generadas
    res.render("index", { listaPalabras });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para empezar a escuchar en el puerto
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
