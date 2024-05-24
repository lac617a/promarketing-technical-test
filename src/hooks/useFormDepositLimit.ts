import React from "react";
import { useForm } from "react-hook-form";

import useData from "@/hooks/useData";
import { DataSelfLimitationRequest } from "@/types/data";
import {
  VALIDATE_FIELDS_DAYS_AMOUNT,
  VALIDATE_FIELDS_WEEKS_AMOUNT,
  VALIDATE_FIELDS_MONTHS_AMOUNT,
} from "@/utils";

export default function useFormDepositLimit() {
  const [errorOptions, setErrorOptions] = React.useState<boolean>(false);
  const {
    success,
    handleToggleSuccess,
    loadingSelfLimitation,
    fetchPostSelfLimitation,
  } = useData();
  const {
    watch,
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<DataSelfLimitationRequest>({
    defaultValues: {
      minimumAmount: undefined,
      description: undefined,
    },
  });

  const watchDailyAmount = watch("dailyAmount");
  const watchWeeklyAmount = watch("weeklyAmount");
  const watchMonthlyAmount = watch("monthlyAmount");

  const validateValueDaysMemoize = React.useMemo(() => {
    const daysWeek =
      watchWeeklyAmount > 0
        ? VALIDATE_FIELDS_DAYS_AMOUNT.weeklyAmount
        : undefined;
    const daysMonth =
      watchMonthlyAmount > 0
        ? VALIDATE_FIELDS_DAYS_AMOUNT.monthlyAmount
        : daysWeek;
    return daysMonth;
  }, [watchMonthlyAmount, watchWeeklyAmount]);

  const validateValueWeeksMemoize = React.useMemo(() => {
    const daysWeek =
      watchDailyAmount >= watchWeeklyAmount
        ? VALIDATE_FIELDS_WEEKS_AMOUNT.weeklyAmount
        : undefined;
    const daysMonth =
      watchMonthlyAmount >= watchWeeklyAmount
        ? VALIDATE_FIELDS_WEEKS_AMOUNT.monthlyAmount
        : daysWeek;
    return { daysWeek, daysMonth };
  }, [watchDailyAmount, watchWeeklyAmount, watchMonthlyAmount]);

  const validateValueMonthsMemoize = React.useMemo(() => {
    const days =
      watchDailyAmount >= watchMonthlyAmount
        ? VALIDATE_FIELDS_MONTHS_AMOUNT.daysAmount
        : undefined;
    const daysMonth =
      watchWeeklyAmount >= watchMonthlyAmount
        ? VALIDATE_FIELDS_MONTHS_AMOUNT.weeklyAmount
        : days;
    return daysMonth;
  }, [watchDailyAmount, watchWeeklyAmount, watchMonthlyAmount]);

  const submitData = async ({
    description,
    minimumAmount,
    ...data
  }: Partial<DataSelfLimitationRequest>) => {
    setErrorOptions(false);
    const validateAmounts = [
      Number(data.dailyAmount),
      Number(data.weeklyAmount),
      Number(data.monthlyAmount),
    ];
    if (validateAmounts.every((item) => item === 0))
      return setErrorOptions(true);

    const request = {
      minimumAmount: Number(minimumAmount),
    } as Partial<DataSelfLimitationRequest>;
    if (description) request.description = description;
    if (validateAmounts[0]) request.dailyAmount = validateAmounts[0];
    if (validateAmounts[1]) request.weeklyAmount = validateAmounts[1];
    if (validateAmounts[2]) request.monthlyAmount = validateAmounts[2];
    await fetchPostSelfLimitation(request).then(() => {
      resetField("minimumAmount");
      resetField("description");
      resetField("dailyAmount");
      resetField("weeklyAmount");
      resetField("monthlyAmount");
    });
  };

  const handleSubmitData = handleSubmit(submitData);

  const handleClearString = (ev: React.KeyboardEvent) => {
    const key = ev.which || ev.keyCode;
    if ((key < 48 || key > 57) && (key < 96 || key > 105) && key != 8) {
      ev.preventDefault();
      return false;
    }
  };

  return {
    register,
    errors,
    success,
    errorOptions,
    handleSubmitData,
    handleClearString,
    handleToggleSuccess,
    loadingSelfLimitation,
    validateValueDaysMemoize,
    validateValueWeeksMemoize,
    validateValueMonthsMemoize,
  };
}
