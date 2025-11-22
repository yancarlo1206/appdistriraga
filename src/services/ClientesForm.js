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

    if (!form.celular) {
        errores.celular = "Please the field is required.";
    } else if (!regexText40.test(form.celular.trim())) {
        errores.celular = "The field accepts up to 40 characters.";
    } else{
        errores.celular = "";
    }

    if (!form.correo) {
        errores.correo = "Please the field is required.";
    } else if (!regexText40.test(form.correo.trim())) {
        errores.correo = "The field accepts up to 40 characters.";
    } else{
        errores.correo = "";
    }

    if (!form.estado) {
        errores.estado = "Please select a state.";
    } else {
        errores.estado = "";
    }

    return errores;
};

const ClientesForm = {
    validationsForm,
  };
  
  export default ClientesForm;