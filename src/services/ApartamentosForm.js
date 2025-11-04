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

    if (!form.edificio) {
        errores.edificio = "Please the field is required.";
    } else if (!regexText40.test(form.edificio.trim())) {
        errores.edificio = "The field accepts up to 40 characters.";
    } else{
        errores.edificio = "";
    }

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else if (!regexText40.test(form.precio.trim())) {
        errores.precio = "The field accepts up to 40 characters.";
    } else{
        errores.precio = "";
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

const ApartamentosForm = {
    validationsForm,
  };
  
  export default ApartamentosForm;