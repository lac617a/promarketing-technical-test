import { addDays, format } from "date-fns";
import { weeksCount } from "./utils";

const DAYS_IN_HOURS = 24;
const WEEKS_IN_HOURS = 168;
const currentMonth = new Date().getMonth() + 1;

const daysInCurrentMonth = () =>
  new Date(new Date().getFullYear(), currentMonth, 0).getDate();

export const TOTAL_WEEKS_IN_HOURS = weeksCount(currentMonth) * WEEKS_IN_HOURS;
export const TOTAL_MONTHS_IN_HOURS = daysInCurrentMonth() * DAYS_IN_HOURS;

export const UNDEFINED = "Indefinido";
export const TEMPORARY_UNTIL = "Temporal hasta";

export const FORMAT_DATE_RANGE = "yyyy-MM-dd";
export const TABS = ["Crear Solicitud", "Límite de depósito"] as const;

export const DEFAULT_VALUE_RANGE = Object.freeze({
  key: "selection",
  startDate: new Date(),
  endDate: addDays(new Date(), 1),
});

export const DEFAULT_DATE_RANGE = Object.freeze({
  startDate: format(new Date(), FORMAT_DATE_RANGE),
  endDate: format(addDays(new Date(), 1), FORMAT_DATE_RANGE),
});

export const VALIDATE_FIELDS_DAYS_AMOUNT = Object.freeze({
  weeklyAmount: {
    value: TOTAL_WEEKS_IN_HOURS,
    message: "El valor de dias tiene que ser menor al valor de semenas",
  },
  monthlyAmount: {
    value: TOTAL_MONTHS_IN_HOURS,
    message: "El valor de dias tiene que ser menor al valor de mensual",
  },
});

export const VALIDATE_FIELDS_WEEKS_AMOUNT = Object.freeze({
  weeklyAmount: {
    value: TOTAL_WEEKS_IN_HOURS,
    message: "El valor de semanas tiene que ser mayor al valor de dias",
  },
  monthlyAmount: {
    value: TOTAL_MONTHS_IN_HOURS,
    message: "El valor de semanas tiene que ser menor al valor mensual",
  },
});

export const VALIDATE_FIELDS_MONTHS_AMOUNT = Object.freeze({
  daysAmount: {
    value: DAYS_IN_HOURS,
    message: "El valor de mensual tiene que ser mayor al valor dias",
  },
  weeklyAmount: {
    value: TOTAL_WEEKS_IN_HOURS,
    message: "El valor de mensual tiene que ser mayor al valor de semanal",
  },
});

export const VALIDATE_PATTERN_NUMBER = Object.freeze({
  pattern: {
    value: /^[0-9]+$/,
    message: "Solo se permiten numérico",
  },
});

export const VALIDATE_FORM_MOTIVE = Object.freeze({
  required: {
    value: true,
    message: "El motivo de autoexclusión es requerido",
  },
  maxLength: { value: 255, message: "Ha superado el límite" },
  minLength: {
    value: 8,
    message: "El mínimo de caracteres es de 8",
  },
});
