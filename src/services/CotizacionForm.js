export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

    if (!form.fecha) {
        errores.fecha = "Please the field is required.";
    } else if (!regexText40.test(form.fecha.trim())) {
        errores.fecha = "The field accepts up to 40 characters.";
    } else{
        errores.fecha = "";
    }

    if (!form.cliente) {
        errores.cliente = "Please the field is required.";
    } else{
        errores.cliente = "";
    }

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

    if (!form.precio) {
        errores.precio = "Please the field is required.";
    } else if (!regexText40.test(form.precio.trim())) {
        errores.precio = "The field accepts up to 40 characters.";
    } else{
        errores.precio = "";
    }

    if (!form.tipo) {
        errores.tipo = "Please the field is required.";
    } else{
        errores.tipo = "";
    }

    if (!form.estado) {
        errores.estado = "Please the field is required.";
    } else{
        errores.estado = "";
    }

    return errores;
};

const CotizacionForm = {
    validationsForm,
  };
  
  export default CotizacionForm;