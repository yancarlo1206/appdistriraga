export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.nombre) {
        errores.nombre = "Please the field is required.";
    } else if (!regexText40.test(form.nombre.trim())) {
        errores.nombre = "The field accepts up to 40 characters.";
    } else{
        errores.nombre = "";
    }

    if (!form.alto) {
        errores.alto = "Please the field is required.";
    } else if (!regexText40.test(form.alto.trim())) {
        errores.alto = "The field accepts up to 40 characters.";
    } else{
        errores.alto = "";
    }

    if (!form.ancho) {
        errores.ancho = "Please the field is required.";
    } else if (!regexText40.test(form.ancho.trim())) {
        errores.ancho = "The field accepts up to 40 characters.";
    } else{
        errores.ancho = "";
    }

    if (!form.factor) {
        errores.factor = "Please the field is required.";
    } else if (!regexText40.test(form.factor.trim())) {
        errores.factor = "The field accepts up to 40 characters.";
    } else{
        errores.factor = "";
    }

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else if (!regexText40.test(form.precio.trim())) {
        errores.precio = "The field accepts up to 40 characters.";
    } else{
        errores.precio = "";
    }

    if (!form.celular) {
        errores.celular = "Please the field is required.";
    } else if (!regexText40.test(form.celular.trim())) {
        errores.celular = "The field accepts up to 40 characters.";
    } else{
        errores.celular = "";
    }

    if (!form.observacion) {
        errores.observacion = "Please the field is required.";
    } else if (!regexText40.test(form.observacion.trim())) {
        errores.observacion = "The field accepts up to 40 characters.";
    } else{
        errores.observacion = "";
    }

    return errores;
};

const EspaciosForm = {
    validationsForm,
  };
  
  export default EspaciosForm;