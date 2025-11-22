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

    const [cliente, setCliente] = useState([]);
    const [edificio, setEdificio] = useState([]);
    const [apartamento, setApartamento] = useState([{"id":"0","text":"Primero se debe seleccionar un edificio..."}]);
    const [tipoCotizacion, setTipoCotizacion] = useState([]);
    const [estadoCotizacion, setEstadoCotizacion] = useState([]);

    const [toEdificio, setToEdificio] = useState();

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL+"cotizacion";

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        if(toUpdate && toUpdate != 0){
            fetchDataDetail();
        }
    },[toUpdate]);

    useEffect(() => {
        if(module){
            fetchDataCliente();
            fetchDataEdificio();
            fetchDataTipoCotizacion();
            fetchDataEstadoCotizacion();
        }
    },[module]);

    useEffect(() => {
        if(toEdificio){
            fetchDataApartamentoEdificio(toEdificio);
        }
    },[toEdificio]);

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
            const detail = {
                ...res.data,
                cliente: res.data?.cliente?.id ?? null,
                edificio: res.data?.apartamento?.edificio?.id ?? null,
                apartamento: res.data?.apartamento?.id ?? null,
                tipo: res.data?.tipo?.id ?? null,
                estado: res.data?.estado?.id ?? null,
                };
            setDetail(detail);
            setLoading(false);
        });
    };

    const fetchDataCliente = () => {
        let urlFetch = REACT_APP_API_URL+"cliente";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setCliente(data);
        });
    };

    const fetchDataEdificio = () => {
        let urlFetch = REACT_APP_API_URL+"edificio";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setEdificio(data);
        });
    };

    const fetchDataTipoCotizacion = () => {
        let urlFetch = REACT_APP_API_URL+"cotizacionTipo";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setTipoCotizacion(data);
        });
    };

    const fetchDataEstadoCotizacion = () => {
        let urlFetch = REACT_APP_API_URL+"cotizacionEstado";
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setEstadoCotizacion(data);
        });
    };

    const fetchDataApartamentoEdificio = (edificioId) => {
        let urlFetch = REACT_APP_API_URL+"apartamento/listPorEdificio/"+edificioId;
        api.get(urlFetch).then((res) => {
            var data = res.data.map(function (obj) {
                obj.text = obj.text || obj.nombre;
                return obj;
            });
            setApartamento(data);
        });
    };

    const saveData = (data) => {
        setLoading(true);
        let endpoint = url;

        const newData = {
            ...data,
            apartamento: { id: data.apartamento },
            cliente: { id: data.cliente },
            tipo: { id: data.tipo },
            estado: { id: data.estado }
        };

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
        
        const newData = {
            ...data,
            apartamento: { id: data.apartamento },
            cliente: { id: data.cliente },
            tipo: { id: data.tipo },
            estado: { id: data.estado }
        };

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
        setModule, setDetail, cliente, edificio, apartamento, tipoCotizacion, 
        estadoCotizacion, toEdificio, setToEdificio
    };

    return <CotizacionContext.Provider value={data}>{children}</CotizacionContext.Provider>;
}

export { CotizacionProvider };
export default CotizacionContext;