export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.edificio) {
        errores.edificio = "Please the field is required.";
    } else{
        errores.edificio = "";
    }

    if (!form.apartamento) {
        errores.apartamento = "Please the field is required.";
    } else{
        errores.apartamento = "";
    }

    if (!form.nombre) {
        errores.nombre = "Please the field is required.";
    } else if (!regexText40.test(form.nombre.trim())) {
        errores.nombre = "The field accepts up to 40 characters.";
    } else{
        errores.nombre = "";
    }

    if (!form.alto) {
        errores.alto = "Please the field is required.";
    } else{
        errores.alto = "";
    }

    if (!form.ancho) {
        errores.ancho = "Please the field is required.";
    } else{
        errores.ancho = "";
    }

    if (!form.factor) {
        errores.factor = "Please the field is required.";
    } else{
        errores.factor = "";
    }

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else{
        errores.precio = "";
    }

    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else{
        errores.estado = "";
    }

    return errores;
};

const EspaciosForm = {
    validationsForm,
  };
  
  export default EspaciosForm;