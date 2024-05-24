import React from "react";
import { useForm } from "react-hook-form";

import useData from "./useData";
import { TEMPORARY_UNTIL, UNDEFINED } from "@/utils";

interface CreateDataProps {
  description: string;
  providers: Array<string>;
  period: typeof TEMPORARY_UNTIL | typeof UNDEFINED;
}

export default function useFormCreateRequest() {
  const [errorsCheckeds, setErrorsCheckeds] = React.useState<boolean>(false);
  const [currentsChecked, setCurrentsChecked] = React.useState<Array<string>>(
    []
  );

  const { loading, providers, fetchGetProviders } = useData();
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDataProps>({
    defaultValues: {
      providers: [],
      description: "",
      period: TEMPORARY_UNTIL,
    },
  });

  const wathCurrentPeriod = watch("period");
  const dataProvidersOnlyName = providers.map((item) => item.name || item.Name);

  const handleChangeChecked = (value: string) => {
    setCurrentsChecked((prev) => {
      if (prev.includes(value)) return prev.filter((item) => item !== value);
      return [...prev, value];
    });
  };

  const handleChangeAllChecked = (status: boolean) => {
    if (status) return setCurrentsChecked(dataProvidersOnlyName);
    setCurrentsChecked([]);
  };

  const checkedAllMemoize = React.useMemo(
    () => currentsChecked.length === dataProvidersOnlyName.length,
    [currentsChecked, dataProvidersOnlyName]
  );

  const submit = async (data: CreateDataProps) => {
    setErrorsCheckeds(false);
    if (currentsChecked.length === 0) return setErrorsCheckeds(true);
    console.log({ data });
  };

  const handleSubmitData = handleSubmit(submit);

  React.useEffect(() => {
    fetchGetProviders();
  }, []);

  return {
    errors,
    register,
    setValue,
    loading,
    errorsCheckeds,
    currentsChecked,
    wathCurrentPeriod,
    checkedAllMemoize,
    dataProvidersOnlyName,
    handleSubmitData,
    handleChangeChecked,
    handleChangeAllChecked,
  };
}
