import React from "react";
import { apiAxios } from "@/lib/api-request";
import { DataProviders, DataSelfLimitationRequest } from "@/types/data";

export default function useData() {
  const [error, setError] = React.useState<any>();
  const [success, setSuccess] = React.useState<boolean>(false);
  const [providers, setProviders] = React.useState<Array<DataProviders>>([]);

  // LOADINGS
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingSelfLimitation, setLoadingSelfLimitation] =
    React.useState<boolean>(false);

  const handleToggleSuccess = (stt: boolean) => setSuccess(stt);

  const fetchGetProviders = async () => {
    setLoading(true);
    try {
      const res = await apiAxios.get("/provider");
      setProviders(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostSelfLimitation = async (
    req: Partial<DataSelfLimitationRequest>
  ) => {
    setLoadingSelfLimitation(true);
    try {
      await apiAxios.post("/self-limitation", req);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoadingSelfLimitation(false);
    }
  };

  return {
    loading,
    success,
    providers,
    fetchGetProviders,
    loadingSelfLimitation,
    fetchPostSelfLimitation,
    handleToggleSuccess,
    error,
  };
}
