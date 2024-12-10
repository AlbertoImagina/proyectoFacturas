import { useParams } from "react-router-dom";
import { useDataId } from "../shared/hooks/useDataId";
import { EndpointTypes } from "../types/Enums/Endpoints";
import InformationFactura from "./InformationFactura";


function Show() {
    const { idToken } = useParams()

    const { data, loading, error } = useDataId({
        endpoint: EndpointTypes.FACTURAS,
        id: idToken || ''
    });
    
    if (loading) {
        return <h1>Cargando datos...</h1>;
    }
    
    if (error) {
        return <h1>Ocurrió un error al cargar los datos</h1>;
    }
    
    return (
        <InformationFactura item={data?.data}/>
        )
}

export default Show
