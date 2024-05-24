import React from "react";

import useFormDepositLimit from "@/hooks/useFormDepositLimit";
import { VALIDATE_FORM_MOTIVE, VALIDATE_PATTERN_NUMBER } from "@/utils";

import { AlertSuccess, Button, Input, TexteareaMotive } from "@/components";

const FormsDepositLimit = () => {
  const {
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
  } = useFormDepositLimit();

  return (
    <div className="space-y-4">
      <AlertSuccess
        open={success}
        onClose={() => handleToggleSuccess(false)}
        message="Tus datos se han guardados exitosamente"
      />
      <h3 className="text-[#4B5563] text-xl font-bold">
        Defina sus límites de depósito
      </h3>
      <form className="space-y-4" onSubmit={handleSubmitData}>
        <div className="space-y-4 bg-[#E0E4EF4D] rounded-lg p-4">
          <Input
            placeholder="Monto mínimo de depósito"
            type="text"
            errorMessage={errors.minimumAmount?.message}
            {...register("minimumAmount", {
              maxLength: { value: 9, message: "Ha superado el límite" },
              minLength: {
                value: 4,
                message: "El mínimo de caracteres es de 4",
              },
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              ...VALIDATE_PATTERN_NUMBER,
            })}
            startIcon={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <Input
            onKeyDown={handleClearString}
            errorMessage={errors.dailyAmount?.message}
            placeholder="Diario (De 00:00 hasta 24:00 hrs)"
            {...register("dailyAmount", {
              ...VALIDATE_PATTERN_NUMBER,
              maxLength: validateValueDaysMemoize,
            })}
          />
          <Input
            errorMessage={errors.weeklyAmount?.message}
            placeholder="Semanal (De lunes a domingo)"
            {...register("weeklyAmount", {
              ...VALIDATE_PATTERN_NUMBER,
              minLength: validateValueWeeksMemoize.daysWeek,
              maxLength: validateValueWeeksMemoize.daysMonth,
            })}
          />
          <Input
            errorMessage={errors.monthlyAmount?.message}
            placeholder="Mensual (Del 1 al 30)"
            {...register("monthlyAmount", {
              ...VALIDATE_PATTERN_NUMBER,
              minLength: validateValueMonthsMemoize,
            })}
          />
          {errorOptions && (
            <p className="text-red-500">
              Es requerido seleccionar al menos un límite a establecer entre las
              opciones:
              <ol>
                <li>Diario</li>
                <li>Semanal</li>
                <li>Mensual</li>
              </ol>
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 bg-[#E0E4EF4D] rounded-lg p-4">
          <h3 className="text-[#4B5563] text-xl font-bold">
            Motivo autolimitación
          </h3>
          <TexteareaMotive
            errorMessage={errors.description?.message}
            {...register("description", {
              ...VALIDATE_FORM_MOTIVE,
              required: {
                value: true,
                message: "El motivo de autolimitación es requerido",
              },
              pattern: {
                value: /^[^',.]*$/,
                message: "Caracteres especiales no permitidos",
              },
            })}
          />
        </div>
        <div className="w-60 mx-auto">
          <Button
            type="submit"
            variant="secondary"
            loading={loadingSelfLimitation}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormsDepositLimit;
