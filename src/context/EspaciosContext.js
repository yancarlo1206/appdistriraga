import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { TYPES } from "actions/genericAction";
import { genericReducer, genericInitialState } from "../reducers/genericReducer";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const EspaciosContext = createContext();

const EspaciosProvider = ({children}) => {

    const [toDetail, setToDetail] = useState();
    const [toUpdate, setToUpdate] = useState();
    const [detail, setDetail] = useState({});
    const [module, setModule] = useState();

    const [edificio, setEdificio] = useState([]);
    const [apartamento, setApartamento] = useState([{"id":"0","text":"Primero se debe seleccionar un edificio..."}]);
    const [estadoEspacio, setEstadoEspacio] = useState([{"id":"1","text":"ACTIVO"},{"id":"0","text":"INACTIVO"}]);

    const [toEdificio, setToEdificio] = useState();

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL+"espacio";

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
            fetchDataEdificio();
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
            res.data['edificio'] = res.data.apartamento?.edificio?.id;
            res.data['apartamento'] = res.data.apartamento?.id;
            setDetail(res.data);
            setLoading(false);
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
            apartamento: { id: data.apartamento }
        };

        delete newData.id;
        
        let options = {
            body: newData,
            headers: {"content-type":"application/json"}
        }
        api.post(endpoint, options).then((res) => {
            if(!res.err){
                dispatch({ type: TYPES.CREATE_DATA, payload: res.data });
                navigate('/admin/espacios/');
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
            apartamento: { id: data.apartamento }
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
                navigate('/admin/espacios');
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
        setModule, setDetail, edificio, setEdificio, apartamento, setApartamento, estadoEspacio,
        setToEdificio
    };

    return <EspaciosContext.Provider value={data}>{children}</EspaciosContext.Provider>;
}

export { EspaciosProvider };
export default EspaciosContext;