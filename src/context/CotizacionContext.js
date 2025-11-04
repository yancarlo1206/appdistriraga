import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const CotizacionContext = createContext();

const CotizacionProvider = ({children}) => {

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
    let url = REACT_APP_API_URL+"cotizacion";

    useEffect(() => {
        //fetchData();
        fetchDataCotizacion();
    },[]);

    useEffect(() => {
        if(toUpdate && toUpdate != 0){
            fetchDataDetail();
        }
    },[toUpdate]);

    const fetchDataCotizacion = () => {
        setLoading(true);

       let data = [
  {
    id: 1,
    fecha: "2025-11-03",
    usuario: "Juan Pérez",
    apartamento: "Torre A - 302",
    precio: "$2.500.000",
    tipo: "Reparación eléctrica",
    observacion: "Incluye cambio de cableado y revisión de tomas.",
    estado: "Pendiente"
  },
  {
    id: 2,
    fecha: "2025-11-02",
    usuario: "María Gómez",
    apartamento: "Edificio Sol - 204",
    precio: "$3.200.000",
    tipo: "Pintura interior",
    observacion: "Pintura lavable color blanco marfil en sala y comedor.",
    estado: "Aprobada"
  },
  {
    id: 3,
    fecha: "2025-10-30",
    usuario: "Carlos López",
    apartamento: "Conjunto Oasis - 101",
    precio: "$1.850.000",
    tipo: "Mantenimiento de plomería",
    observacion: "Cambio de grifos y revisión de fugas en baño.",
    estado: "Rechazada"
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
                navigate('/admin/cotizacion/');
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
                navigate('/admin/cotizacion');
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

    return <CotizacionContext.Provider value={data}>{children}</CotizacionContext.Provider>;
}

export { CotizacionProvider };
export default CotizacionContext;