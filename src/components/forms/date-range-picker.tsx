import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import React from "react";
import { format } from "date-fns";
import { Range, RangeKeyDict, DateRange } from "react-date-range";

import { classNames, DEFAULT_VALUE_RANGE, FORMAT_DATE_RANGE } from "@/utils";

import Input from "./input";
import Button from "../buttons/generic";

interface Props<T = Range> {
  disabled?: boolean;
  onChangeValue: (value: T) => void;
}

const InputDateRange: React.FC<Props> = ({ disabled, onChangeValue }) => {
  const node = React.useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const [dateRanges, setDateRanges] = React.useState<Range[]>([
    DEFAULT_VALUE_RANGE,
  ]);

  const toggleRangePicker = () => setShowCalendar((prev) => !prev);

  const handleApplyDate = () => {
    onChangeValue(dateRanges[0]);
    toggleRangePicker();
  };

  const handleDefautlDate = () => {
    setDateRanges([DEFAULT_VALUE_RANGE]);
    toggleRangePicker();
  };

  const handleValidateDate = (date: RangeKeyDict) => {
    const selection = date.selection;
    if (
      new Date(selection.startDate as Date).getTime() ===
        new Date(selection.endDate as Date).getTime() &&
      !showCalendar
    ) {
      return toggleRangePicker();
    }
    setDateRanges([selection]);
    onChangeValue({
      endDate: format(
        selection.endDate as Date,
        FORMAT_DATE_RANGE
      ) as unknown as Date,
      startDate: format(
        selection.startDate as Date,
        FORMAT_DATE_RANGE
      ) as unknown as Date,
    });
  };

  const defaultValue = React.useMemo(() => {
    return `${format(dateRanges[0].startDate as Date, "dd/MM/yyyy")} - ${format(
      dateRanges[0].endDate as Date,
      "dd/MM/yyyy"
    )}`;
  }, [dateRanges]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (node.current && !node.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={node}
      className="relative w-full"
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
    >
      <Input
        id="range-calendar"
        readOnly
        disabled={disabled}
        value={defaultValue}
        placeholder={defaultValue}
        onFocus={() => setShowCalendar(true)}
      >
        {showCalendar && (
          <div
            id="dropdown"
            className="block absolute top-9"
            aria-labelledby="dropdownDefaultButton"
          >
            <DateRange
              months={1}
              ranges={dateRanges}
              minDate={new Date()}
              direction="horizontal"
              showDateDisplay={false}
              color="var(--secondary)"
              calendarFocus="backwards"
              showMonthAndYearPickers={false}
              rangeColors={["var(--secondary)"]}
              onChange={(item) => handleValidateDate(item)}
              className={classNames(showCalendar ? "" : "rdrHide")}
            />
            <div className="flex gap-2 my-3 w-full justify-end">
              <Button variant="secondary" onClick={handleDefautlDate}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleApplyDate}>
                Aplicar
              </Button>
            </div>
          </div>
        )}
      </Input>
    </div>
  );
};

export default InputDateRange;
