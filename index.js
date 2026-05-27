const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleDateString()}] ${req.method} ${req.url}`);
    next();
});


const notas = [
    { id: 1, titulo: "Estructura", contenido: "Planear una estructura animica" },
    { id: 2, titulo: "Imagenes", contenido: "Buscar imagenes relacionadas con comida, cocina y alimentos" },
    {
        id: 3,
        titulo: "Diseño",
        contenido: "Empezar a crear el diseño de la API, que sea algo innovador",
    },
];

app.get("/api/notas", (req, res) => {
    return res.json(notas);
});

app.post("/api/notas", (req, res) => {
    const { titulo, contenido } = req.body;
    if (!titulo || !contenido) {
        return res.status(400).json({ error: "falta el titulo o el contenido"});
    }

    const nuevaNota = {
        id: notas.length + 1,
        titulo,
        contenido,
    };

    notas.push(nuevaNota);
    res.status(200).json(nuevaNota);
});


app.get("/api/health", (rep, res) => {
    res.status(200).json({ status: "ok"});

});



app.get("/api/notas/:id", (req, res) => {
    res.json(notas);
});


app.get("/api/notas/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number(id) || id < 1 || id > notas.length) {
        return res.status(400).json({ error: "ID invalido"});
    }
    res.json(notas[id - 1]);
});



app.get("/api/notas",(req, res) =>{
    res.json([{id: 1, titulo: "Test"}]);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

