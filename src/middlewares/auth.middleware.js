// Solo deja pasar a usuarios autenticados
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  req.session.flash = {
    type: "error",
    message: "Debe iniciar sesión para acceder a esa sección",
  };
  res.redirect("/login");
};

// Solo deja pasar a usuarios NO autenticados (login y registro)
const isGuest = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  res.redirect("/categorias");
};

module.exports = {
  isAuthenticated,
  isGuest,
};
