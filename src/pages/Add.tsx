import { useData } from "../shared/hooks/useData";
import { EndpointTypes } from "../types/Enums/Endpoints";
import AddFacturas from "./AddFacturas";


function Add() {

    const { loading, error, refreshData } = useData({
        endpoint: EndpointTypes.FACTURAS,
    });
    
    if (loading) {
        return <h1>Cargando datos...</h1>;
    }
    
    if (error) {
        return <h1>Ocurrió un error al cargar los datos</h1>;
    }
    
    return (
        <AddFacturas refreshData={refreshData}/>
        )
}

export default Add
