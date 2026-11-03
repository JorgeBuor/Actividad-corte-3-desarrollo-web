require("dotenv").config();

const express = require("express");
const app = express();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const session = require("express-session");

const layouts = require("express-ejs-layouts");

const path = require("path");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "cambiar-este-secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
    },
  })
);

// Datos disponibles en todas las vistas: usuario logueado y mensaje flash
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(layouts);
app.set("layout", "layouts/layout");

const { isAuthenticated } = require("./src/middlewares/auth.middleware");

const mainRouter = require("./src/routes/main.router");
app.use(mainRouter);

app.use(require("./src/routes/auth.router"));
app.use("/categorias", isAuthenticated, require("./src/routes/categorias.router"));
app.use("/productos", require("./src/routes/productos.router"));
app.use("/contacto", require("./src/routes/contacto.router"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
