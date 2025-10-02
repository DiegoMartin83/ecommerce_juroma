# Ecommerce Backend

Proyecto backend de un sistema de comercio electrónico desarrollado con **Node.js, TypeScript, Express, TypeORM y MySQL**.  
Este proyecto está estructurado para ser escalable y mantener separadas las responsabilidades en controladores, entidades y rutas.

---

## 🚀 Tecnologías utilizadas

- **Node.js** (entorno de ejecución)
- **TypeScript**
- **Express** (framework web)
- **TypeORM** (ORM para MySQL)
- **MySQL**
- **JWT** (autenticación basada en tokens)
- **Dotenv** (gestión de variables de entorno)
- **Nodemon + ts-node** (entorno de desarrollo)

---

## 📂 Estructura del proyecto

ecommerce-backend/
│── src/
│ ├── config/
│ │ └── data-source.ts # Configuración de conexión con la base de datos
│ ├── controllers/ # Lógica de negocio
│ │ ├── auth.controller.ts
│ │ └── user.controller.ts
│ ├── entities/ # Entidades de TypeORM
│ │ ├── User.ts
│ │ ├── Product.ts
│ │ └── Auth.ts
│ ├── routes/ # Definición de rutas
│ │ ├── auth.routes.ts
│ │ ├── user.routes.ts
│ │ └── product.routes.ts
│ ├── index.ts # Punto de entrada principal
│ └── ...
│── .env # Variables de entorno
│── tsconfig.json # Configuración de TypeScript
│── package.json
│── nodemon.json
│── README.md

markdown
Copiar código

---

## ✅ Funcionalidades implementadas

- **Usuarios**
  - Registro de usuario
  - Listado de usuarios (acceso protegido mediante autenticación)

- **Autenticación**
  - Inicio de sesión con **JWT**
  - Middleware para protección de rutas privadas
  - Lógica de autenticación separada en `auth.controller` y `auth.routes`

- **Infraestructura**
  - Configuración de conexión a base de datos con **TypeORM**
  - Uso de variables de entorno con **dotenv**
  - Scripts de desarrollo configurados con `nodemon`

---

## 📌 Próximas tareas (TO-DO)

- **Gestión de productos**
  - [ ] Crear producto
  - [ ] Listar productos
  - [ ] Obtener producto por ID
  - [ ] Actualizar producto
  - [ ] Eliminar producto

- **Carrito de compras**
  - [ ] Agregar productos al carrito
  - [ ] Visualizar carrito del usuario
  - [ ] Eliminar producto del carrito
  - [ ] Vaciar carrito
  - [ ] Procesar checkout (opcional)

- **Gestión de pedidos (Orders)**
  - [ ] Crear pedido a partir del carrito
  - [ ] Listar pedidos por usuario
  - [ ] Listar todos los pedidos (acceso de administrador)

- **Mejoras generales**
  - [ ] Validaciones con `class-validator`
  - [ ] Hash de contraseñas con `bcrypt`
  - [ ] Roles de usuario (administrador / cliente)
  - [ ] Implementación de tests (Jest / Supertest)

---

## ⚙️ Variables de entorno

Se debe crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=ecommerce_db
JWT_SECRET=clave_secreta
▶️ Scripts disponibles
Entorno de desarrollo

bash
Copiar código
npm run dev
Compilación a JavaScript (carpeta /dist)

bash
Copiar código
npm run build
Ejecución del compilado

bash
Copiar código
npm start
📌 Notas importantes
La opción synchronize: true en TypeORM está habilitada únicamente para desarrollo, ya que crea y actualiza tablas automáticamente.

Para entornos de producción se recomienda implementar migraciones de base de datos.