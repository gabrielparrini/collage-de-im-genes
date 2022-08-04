const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");
const fs = require("fs");
app.listen(3000, () => console.log("Escuchando en el puerto " + 3000));

const configExpressFileUpload = {
  limits: { fileSize: 5000000 },
  abortOnLimit: true,
  responseOnLimit: "Supera el límite permitido de 5MB",
};
app.use(expressFileUpload(configExpressFileUpload));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/formulario.html");
});
app.get("/collage", (req, res) => {
  res.sendFile(__dirname + "/collage.html");
});
app.post("/imagen", (req, res) => {
  const { target_file } = req.files;
  const { posicion } = req.body;
  target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
    res.redirect("/collage");
  });
});
