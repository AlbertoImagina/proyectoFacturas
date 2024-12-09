import { useData } from "../shared/hooks/useDataId";
import { EndpointTypes } from "../types/Enums/Endpoints";
import EditFacturas from "./EditFacturas";
import { useParams } from "react-router-dom";


function Editar() {
    const {token} = useParams()

    const { data, loading, error } = useData({
        endpoint: EndpointTypes.FACTURAS,
        id: token
    });
    
    if (loading) {
        return <h1>Cargando datos...</h1>;
    }
    
    if (error) {
        return <h1>Ocurrió un error al cargar los datos</h1>;
    }
    
    return (
        <EditFacturas item={data?.data}/>
        )
    }


export default Editar
