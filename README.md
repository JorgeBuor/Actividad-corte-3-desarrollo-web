# CRUD con Node.js

CRUD de categorías con Node.js, Express, EJS y SQLite, con registro e inicio de sesión de usuarios. Solo los usuarios autenticados pueden acceder a `/categorias`.

## Instalar

```shell
npm install
```

Copiar `.env-example` a `.env` y completar `PORT` y `SESSION_SECRET`.

## Ejecutar 

```shell
npm run dev
```

## Rutas de autenticación

- `GET/POST /register`: registro de usuarios
- `GET/POST /login`: inicio de sesión
- `POST /logout`: cierre de sesión
