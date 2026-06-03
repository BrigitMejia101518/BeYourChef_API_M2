const express = require("express");
const fs = require("node:fs").promises;
const path = require("node:path");


const app = express();
const PUERTO = 3000;

//MIDDLEWARES //


app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});



//BASE DE DATOS: ARRAY


const recetas = [
    { 
        id: 1, 
        Titulo: "Pan con tomate", 
        Ingredientes: [ 
        "1 rebanada de pan",
        "1 tomate maduro",
        "1 diente de ajo",
        "1 chorrito de aceite de oliva",
        "1 pizca de sal"
    ],
        Preparacion : "Tuesta el pan. Frota el ajo sobre la miga. Ralla el tomate y extiéndelo por encima. Añade sal y aceite de oliva al gusto." 
    },
    { 
        id: 2, 
        Titulo: "Tortilla Francesa", 
        Ingredientes: [
        "2 huevos",
        "1 cucharadita de aceite de oliva",
        "1 pizca de sal"
    ],
        Preparacion: "Bate los huevos en un bol con la sal. Calienta el aceite en una sartén. Vierte los huevos y cocínalos un minuto. Enrolla la tortilla sobre sí misma." 
    },
    { 
        id: 3, 
        Titulo: "Guacamole Express", 
        Ingredientes: [
        "2 aguacates maduros",
        "1/2 limon lima",
        "1 pizca de sal",
        "1 chorrito de aceite de oliva"
    ],
        Preparacion: "Pela los aguacates y machaca la pulpa con un tenedor. Añade el zumo de la lima, la sal y el aceite. Mezcla todo bien hasta que quede homogéneo." 
    }
];


//RUTAS /ENDPOINTS//

app.get("/api/health", (req, res) => {
    return res.status(200).json({ status: "ok" });
});



app.get("/api/saludo/:nombre", (req, res) => {
    const nombre = req.params.nombre;

    if (nombre.length < 3) {
        return res.status(400).json({ error: "El nombre es muy corto" });
    }
    return res.status(200).json({ mensaje: `Hola, ${nombre}` });
});



//CRUD//

//GET - LEER TODAS//

app.get("/api/recetas", async(req, res) => {
    try{
        const recetas = await cargarRecetas();
        return res.status(200).json(recetas);
    }catch(error){
        return res.status(500).json({ error: "Error de servidor"});
    }
    
});



//GET - LEER SOLO ID//

app.get("/api/recetas/:id", async(req, res) => {
    try{
        const recetas = await cargarRecetas();
        const idSearch = Number(req.params.id);
        const receta = recetas.find((r) => r.id === id);

    if (!receta) {
        return res.status(404).json({ error: "Receta no encontrada" });

    }
    return res.json(receta);

    }catch(error) {
        return res.status(500).json({ error: "Error de servidor"});
    }

    
});



//POST - CREAR//



app.post("/api/recetas", async(req, res) => {
    const { Titulo, Ingredientes, Preparacion } = req.body;
    
    if (!Titulo || !Ingredientes || !Preparacion) {
    return res.status(400).json({ error: "Falta título,ingredientes o Preparacion" });
    }
    try{
        const recetas = await cargarRecetas();
        const nuevoId = recetas.length + 1;
        const nuevaReceta = { id: nuevoId, Titulo, Ingredientes, Preparacion };
        recetas.push(nuevaReceta);

        await guardarRecetas(recetas);
        return res.status(201).json(nuevaReceta);
    }catch(error) {
        return res.status(500).json({ error: "Error interno al escribir el archivo" });
    }
    
});

    


//PUT - REEMPLAZAR//

app.put("/api/recetas/:id", async (req, res) => {
    const idSearch = Number(req.params.id);
    const { Titulo, Ingredientes, Preparacion } =req.body;

    if(!Titulo || !Ingredientes || !Preparacion) {
        return res.status(400). json({ error: "Faltan campos obligatorios para el PUT"});
    }


    try{
        const recetas = await cargarRecetas();
        const indexFound = recetas.findIndex((receta) => receta.id === idSearch);
    
    if(indexFound === -1) {
        return res.status(404).json({ error: "Receta no encontrada para reemplazar"});
    
    }

    const recetaActualizada = { id: idSearch, Titulo, Ingredientes, Preparacion };
    recetas[indexFound] = recetaActualizada;

    await guardarRecetas(recetas);
    return res.json(recetaActualizada);


    } catch(error) {
        return res.status(500).json({ error: "Error interno al actualizar el archivo "})

    }

});





//DELETE - ELIMINAR//



app.delete("/api/recetas/:id", async (req, res) => {
    const idSearch = Number(req.params.id);
    
    try {
        const recetas = await cargarRecetas();
        const indexFound = recetas.findIndex((receta) => receta.id === idSearch);

    if(indexFound === -1) {
        return res.status(404).json({ error: "Receta no encontrada para eliminar"});
    }

        const [recetaBorrada] = recetas.splice(indexFound, 1);

        await guardarRecetas(recetas);
        return res.json({ mensaje: "Receta eliminada correctamente", recetaBorrada });

    } catch(error) {
        return res.status(500).json({ error: "Error interno al eliminar el archivo "});

    }
    
});


app.listen(PUERTO, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${PUERTO}`);
});
