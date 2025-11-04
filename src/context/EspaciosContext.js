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

    const navigate = useNavigate();
    const { REACT_APP_API_URL } = process.env;

    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    const [state, dispatch] = useReducer(genericReducer, genericInitialState);
    const { db } = state;

    let api = helpHttp();
    let url = REACT_APP_API_URL+"espacios";

    useEffect(() => {
        //fetchData();
        fetchDataEspacios();
    },[]);

    useEffect(() => {
        if(toUpdate && toUpdate != 0){
            fetchDataDetail();
        }
    },[toUpdate]);

    const fetchDataEspacios = () => {
        setLoading(true);

        let data = [
  {
    id: 1,
    nombre: "Sala Principal",
    alto: "2.8 m",
    ancho: "4.5 m",
    factor: "1.2",
    precio: "$1.200.000",
    celular: "3001234567",
    observacion: "Espacio amplio con buena iluminación natural."
  },
  {
    id: 2,
    nombre: "Cocina Integral",
    alto: "2.5 m",
    ancho: "3.2 m",
    factor: "1.0",
    precio: "$950.000",
    celular: "3109876543",
    observacion: "Incluye gabinetes superiores y zona de lavado."
  },
  {
    id: 3,
    nombre: "Balcón",
    alto: "2.6 m",
    ancho: "2.8 m",
    factor: "0.8",
    precio: "$600.000",
    celular: "3014567890",
    observacion: "Vista panorámica hacia el conjunto residencial."
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
        setModule, setDetail 
    };

    return <EspaciosContext.Provider value={data}>{children}</EspaciosContext.Provider>;
}

export { EspaciosProvider };
export default EspaciosContext;