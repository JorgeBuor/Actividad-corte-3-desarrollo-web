const bcrypt = require("bcryptjs");

const model = require("../models/User");
const { validateRegister, validateLogin } = require("../validators/auth.validator");

const showRegister = (req, res) => {
  res.render("auth/register", { errors: {}, old: {} });
};

const register = (req, res) => {
  const data = {
    name: (req.body.name || "").trim(),
    email: (req.body.email || "").trim().toLowerCase(),
    password: req.body.password || "",
    password_confirm: req.body.password_confirm || "",
  };

  // Nunca se devuelven las contraseñas al formulario
  const old = { name: data.name, email: data.email };

  const errors = validateRegister(data);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render("auth/register", { errors, old });
  }

  model.findByEmail(data.email, (error, user) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    if (user) {
      return res.status(422).render("auth/register", {
        errors: { email: "Ya existe un usuario registrado con ese email" },
        old,
      });
    }

    bcrypt.hash(data.password, 10, (error, hash) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }

      model.create(data.name, data.email, hash, (error, id) => {
        if (error) {
          return res.status(500).send("Internal Server Error");
        }

        req.session.flash = {
          type: "success",
          message: "Usuario registrado correctamente. Ya puede iniciar sesión.",
        };
        res.redirect("/login");
      });
    });
  });
};

const showLogin = (req, res) => {
  res.render("auth/login", { errors: {}, old: {} });
};

const login = (req, res) => {
  const data = {
    email: (req.body.email || "").trim().toLowerCase(),
    password: req.body.password || "",
  };

  const old = { email: data.email };

  const errors = validateLogin(data);

  if (Object.keys(errors).length > 0) {
    return res.status(422).render("auth/login", { errors, old });
  }

  model.findByEmail(data.email, (error, user) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    // Mismo mensaje si el email no existe o si la contraseña es incorrecta,
    // para no revelar qué emails están registrados
    const invalid = () =>
      res.status(401).render("auth/login", {
        errors: { general: "Email o contraseña incorrectos" },
        old,
      });

    if (!user) {
      return invalid();
    }

    bcrypt.compare(data.password, user.password, (error, match) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }

      if (!match) {
        return invalid();
      }

      // Se regenera la sesión para evitar fijación de sesión
      req.session.regenerate((error) => {
        if (error) {
          return res.status(500).send("Internal Server Error");
        }

        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect("/categorias");
      });
    });
  });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

module.exports = {
  showRegister,
  register,
  showLogin,
  login,
  logout,
};
