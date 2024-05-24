import React from "react";
import InputCheckbox from "./checkbox";
import Loading from "../utils/loading";

interface Props {
  loading: boolean;
  checkeds: ReadonlyArray<string>;
  suggestions: ReadonlyArray<string>;
  onChange: (value: string) => void;
}

const CheckboxGroup: React.FC<Props> = ({
  loading,
  checkeds,
  suggestions,
  onChange,
}) => {
  if (loading) return <Loading fill="var(--primary)" />;
  return suggestions.map((item) => (
    <InputCheckbox
      key={item}
      label={item}
      checked={checkeds.includes(item)}
      onChange={() => onChange(item)}
    />
  ));
};

export default React.memo(CheckboxGroup);
