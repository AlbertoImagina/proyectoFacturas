import axios from "axios"
import { Factura } from "../../types/Facturas"


const _axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const getFacturaData = async (endpoint: string) => {
    return _axios.get(`${endpoint}`)
    .then((response) => response)
}

export const addData = ( data:Factura ) => _axios.post('facturas', data)

export const updateData = ( data:Factura ) => _axios.put(`facturas/${data.id}`, data)


export const deleteData = async (id: string) => { return _axios.delete(`facturas/${id}`)
    .then((response) => response)
}