const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/;

// Devuelve un objeto { campo: "mensaje" } con los errores encontrados.
// Si el objeto está vacío, los datos son válidos.
const validateRegister = ({ name, email, password, password_confirm }) => {
  const errors = {};

  if (!name) {
    errors.name = "El nombre es obligatorio";
  } else if (name.length < 3 || name.length > 50) {
    errors.name = "El nombre debe tener entre 3 y 50 caracteres";
  } else if (!NAME_REGEX.test(name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  }

  if (!email) {
    errors.email = "El email es obligatorio";
  } else if (email.length > 100 || !EMAIL_REGEX.test(email)) {
    errors.email = "El email no tiene un formato válido";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = "La contraseña debe contener letras y números";
  }

  if (!password_confirm) {
    errors.password_confirm = "Debe confirmar la contraseña";
  } else if (password !== password_confirm) {
    errors.password_confirm = "Las contraseñas no coinciden";
  }

  return errors;
};

const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "El email es obligatorio";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "El email no tiene un formato válido";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria";
  }

  return errors;
};

module.exports = {
  validateRegister,
  validateLogin,
};
