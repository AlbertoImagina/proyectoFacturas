import { useQuery } from "@tanstack/react-query";
import { EndpointTypes } from "../../types/Enums/Endpoints";
import { getFacturaData } from "../middlewares/getData";



interface Props {
  endpoint: EndpointTypes;
}

export const useData = ({ endpoint }: Props) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [endpoint],
    queryFn: () => getFacturaData(endpoint),
  });

  return {
    loading: isLoading,
    error: isError,
    data: data,
    refreshData: refetch,
  };
};
