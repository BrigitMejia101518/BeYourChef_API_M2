# API BeYourChef 🍲🥗

Proyecto del Módulo 2 — Full Stack Dev Bootcamp.

## Qué es

**BeYourChef** es el backend (API REST) de una aplicación web diseñada para los amantes de la cocina. Permite gestionar un catálogo completo de recetas culinarias y ofrece un sistema seguro de usuarios donde cada persona puede registrarse, iniciar sesión y guardar sus platos preferidos en una lista de favoritos.

## Stack

- Node.js + Express.
- MongoDB + Mongoose.
- JWT para autenticación.
- MongoDB Atlas.


## Características Principales

- **CRUD de Recetas:** Creación, lectura, actualización y borrado de platos.

- **Autenticación Segura (Auth):** Registro e inicio de sesión con Tokens JWT (válidos por 1 hora).

- **Seguridad Avanzada:** Contraseñas encriptadas en la base de datos de forma irreversible usando `bcryptjs`.

- **Sistema de Favoritos Inteligente:** Los usuarios añaden recetas a su perfil sin duplicados (usando `$addToSet`) y sin modificar el catálogo general de recetas.

- **Validación Estricta:** Control de datos con `express-validator` para evitar textos vacíos o IDs inválidos.


## Estructura del Proyecto 📁


src/
├── controllers/    # Cerebro del código (auth_controller.js, recipes_controller.js)
├── middlewares/    # Guardias de seguridad (verifyToken.js, validate.js)
├── models/         # Estructura de MongoDB con Mongoose (user_model.js, recipes_model.js)
├── routers/        # Mapas de URLs (auth_router.js, recipes_router.js)
├── validators/     # Reglas de inspección de datos (auth_validator.js, recipes_validator.js)
└── app.js          # Configuración global del servidor Express





## Referencia de la API (Endpoints) 🗺️

### Autenticación y Usuarios

- `POST /api/auth/register` - Registro de nuevos usuarios (Público).

- `POST /api/auth/login` - Iniciar sesión. Devuelve el Token JWT (Público).

- `GET /api/auth/profile` - Ver perfil del usuario logueado (Protegido con Token).

- `POST /api/auth/favorite/:recipeId` - Añadir una receta a tus favoritos (Protegido con Token).



### Recetas

- `GET /api/recipes` - Ver todas las recetas (Público).

- `GET /api/recipes/:id` - Ver los detalles de una receta por su ID (Público).

- `POST /api/recipes` - Crear una nueva receta (Protegido con Token).

- `PUT /api/recipes/:id` - Editar una receta de forma parcial (Protegido con Token).

- `DELETE /api/recipes/:id` - Borrar una receta (Protegido con Token).


## Variables de Entorno ⚙️

Para hacer funcionar este proyecto, necesitarás crear un archivo `.env` en la raíz con las siguientes variables:

`PORT=3000`  
`MONGO_URI=mongodb://127.0.0.1:27017/beyourchef`  
`JWT_SECRET=tu_palabra_secreta_para_los_tokens`



## Instalación y Arranque 🏃‍♂️

1. Instala las dependencias del proyecto:

bash

npm install

2. Arranque del servidor del proyecto:

bash

npm run dev


## Authors

- [@BrigitMejia101518](https://github.com/BrigitMejia101518)


# BeYourChef_API_M2

