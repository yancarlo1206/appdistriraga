import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const EdificiosContext = createContext();

const EdificiosProvider = ({children}) => {

    const [toDetail, setToDetail] = useState();
    const [toUpdate, setToUpdate] = useState();
    const [detail, setDetail] = useState({});
    const [module, setModule] = useState();

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL+"edificio";

    useEffect(() => {
        //fetchData();
        fetchDataEdificio();
    },[]);

    useEffect(() => {
        if(toUpdate && toUpdate != 0){
            fetchDataDetail();
        }
    },[toUpdate]);

    const fetchDataEdificio = () => {
        setLoading(true);
        let data = [
  {
    id: 1,
    nombre: "Torre Santander",
    direccion: "Avenida 4 #12-45",
    ciudad: "Cúcuta",
    ubicacion: "Zona Centro",
    administrador: "Julián Rodríguez",
    celular: "3104567890",
    fecha: "2024-01-15",
    estado: "Activo",
    observacion: "Edificio moderno con 10 pisos, parqueadero cubierto y gimnasio."
  },
  {
    id: 2,
    nombre: "Conjunto Los Almendros",
    direccion: "Calle 8 #23-60",
    ciudad: "El Zulia",
    ubicacion: "Barrio La Primavera",
    administrador: "Paola Guerrero",
    celular: "3019876543",
    fecha: "2024-02-10",
    estado: "Inactivo",
    observacion: "Actualmente en remodelación de zonas comunes y fachada."
  },
  {
    id: 3,
    nombre: "Residencias El Mirador",
    direccion: "Carrera 6 #15-20",
    ciudad: "Los Patios",
    ubicacion: "Sector La Sabana",
    administrador: "Andrés Carvajal",
    celular: "3201234567",
    fecha: "2024-03-05",
    estado: "Activo",
    observacion: "Cuenta con vista panorámica, zona verde y portería 24 horas."
  }
];


        dispatch({ type: TYPES.READ_ALL_DATA, payload: data });
        setLoading(false);
    };

    const fetchData = () => {
        setLoading(true);
         api.get(url).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.READ_ALL_DATA, payload: res.data });
            }else{
                dispatch({ type: TYPES.NO_DATA });
            }
            setLoading(false);
        });
    };

    const fetchDataDetail = () => {
        setLoading(true);
        url = url+"/"+toUpdate;
        api.get(url).then((res) => {
            setDetail(res.data);
            setLoading(false);
        });
    };

    const saveData = (data) => {
        setLoading(true);
        let endpoint = url;
        let newData = data;
        delete newData.id;
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.post(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
                navigate('/admin/edificios/');
                setType("success");
                setMessage("The registry was updated correctly");
                setStatus(1);
            }else{

            }
            setLoading(false);
        })
    }

    const updateData = (data) => {
        setLoading(true);
        let endpoint = url+"/"+data.id;
        let newData = data;
        delete newData.id;
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.put(endpoint, options).then((res) => {
            if(!res.err){
                setDetail(res.data);
                dispatch({ type: TYPES.UPDATE_DATA, payload: res.data });
                navigate('/admin/edificios');
                setType("success");
                setMessage("The registry was updated correctly");
                setStatus(1);
            }else{

            }
            setLoading(false);
        })
    }

    const deleteData = (id) => {
        setLoading(true);
        let endpoint = url+"/"+id;
        let options = {
            body: "",
            headers: {"content-type":"application/json"}
        }
        api.del(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.DELETE_DATA, payload: id });
                setType("success");
                setMessage("The registry was deleted correctly");
                setStatus(1);
            }else{
                setType("danger");
                setMessage(res.message.message);
                setStatus(1);
            }
            setLoading(false);
        });
    }

    const data = { 
        db, detail, setToDetail, setToUpdate, updateData, saveData, deleteData, module, 
        setModule, setDetail 
    };

    return <EdificiosContext.Provider value={data}>{children}</EdificiosContext.Provider>;
}

export { EdificiosProvider };
export default EdificiosContext;