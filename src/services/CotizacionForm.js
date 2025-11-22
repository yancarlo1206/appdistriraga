export const validationsForm = (form) => {
    let errores = {};
    let regexText40 = /^.{1,40}$/;

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