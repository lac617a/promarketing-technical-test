import React from "react";

import useFormCreateRequest from "@/hooks/useFormCreateRequest";
import { TEMPORARY_UNTIL, UNDEFINED, VALIDATE_FORM_MOTIVE } from "@/utils";

import {
  Button,
  CheckboxGroup,
  InputCheckbox,
  InputDateRange,
  InputCheckradio,
  TexteareaMotive,
} from "@/components";

const FormsCreateRequest = () => {
  const {
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
  } = useFormCreateRequest();

  return (
    <form onSubmit={handleSubmitData} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 bg-[#E0E4EF4D] rounded-lg p-4">
        <h3 className="text-[#4B5563] text-xl font-bold">
          Autoexclusión PROVEEDORES
        </h3>
        <InputCheckbox
          label="Todos"
          id="checked-parent"
          checked={checkedAllMemoize}
          onChange={(e) => handleChangeAllChecked(e.target.checked)}
        />
        <hr />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-x-3 gap-y-4">
          <CheckboxGroup
            loading={loading}
            checkeds={currentsChecked}
            onChange={handleChangeChecked}
            suggestions={dataProvidersOnlyName}
          />
        </div>
        {errorsCheckeds && (
          <p className="text-red-500">
            Como mínimo tienes que seleccionar un proveedor
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 bg-[#E0E4EF4D] rounded-lg p-4">
        <h3 className="text-[#4B5563] text-xl font-bold">
          Por un período de tiempo
        </h3>
        <div className="flex gap-5">
          <InputCheckradio
            id={TEMPORARY_UNTIL}
            label={TEMPORARY_UNTIL}
            checked={wathCurrentPeriod === TEMPORARY_UNTIL}
            onChange={() => setValue("period", TEMPORARY_UNTIL)}
          />
          <InputCheckradio
            id={UNDEFINED}
            label={UNDEFINED}
            checked={wathCurrentPeriod === UNDEFINED}
            onChange={() => setValue("period", UNDEFINED)}
          />
        </div>
        <InputDateRange
          disabled={wathCurrentPeriod === UNDEFINED}
          onChangeValue={(range) => console.log(range)}
        />
      </div>
      <div className="flex flex-col gap-4 bg-[#E0E4EF4D] rounded-lg p-4">
        <h3 className="text-[#4B5563] text-xl font-bold">
          Motivo autoexclusión
        </h3>
        <TexteareaMotive
          errorMessage={errors.description?.message}
          {...register("description", VALIDATE_FORM_MOTIVE)}
        />
      </div>
      <div className="w-60 mx-auto">
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};

export default FormsCreateRequest;
