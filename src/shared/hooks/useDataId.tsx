import { useQuery } from "@tanstack/react-query";
import { EndpointTypes } from "../../types/Enums/Endpoints";
import { getFacturaData } from "../middlewares/getData";

interface Props {
  endpoint: EndpointTypes;
  id: string;
}

export const useData = ({ endpoint, id }: Props) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [endpoint, id],
    queryFn: () => getFacturaData(`${endpoint}/${id}`),
  });

  return {
    loading: isLoading,
    error: isError,
    data: data,
    refreshData: refetch,
  };
};
