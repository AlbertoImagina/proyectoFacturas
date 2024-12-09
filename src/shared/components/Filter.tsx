import { Select } from "@chakra-ui/react"

interface filter {
    onChange: (data: any) => void
}

function Filter({onChange} : filter) {

    return (
        <Select placeholder="Filtrar facturas" onChange={(e) => {
            const option = e.target.value
            if(option === 'Pagada') {
                onChange(true)
            } else if (option === 'No Pagada') {
                onChange(false)
            } else {
                onChange([])
            }
        }}>
            <option value="Pagada">Pagada</option>
            <option value="No Pagada">No Pagada</option>
        </Select>
    )
}

export default Filter
