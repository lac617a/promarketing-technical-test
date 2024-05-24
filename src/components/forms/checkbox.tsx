import React from "react";

import { InputProps } from "@/types/components";
import { classNames, generateUuid } from "@/utils";

const InputCheckbox: React.FC<InputProps> = ({
  id,
  label,
  className,
  classNameLabel,
  ...props
}) => {
  const generateId = id ?? generateUuid();
  return (
    <div className="flex items-center">
      <input
        id={generateId}
        type="checkbox"
        className={classNames(
          "w-4 h-4 text-secondary rounded focus:ring-2",
          className as string
        )}
        {...props}
      />
      <label
        htmlFor={generateId}
        className={classNames(
          "ms-2 text-sm font-medium text-gray-900",
          classNameLabel as string
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;
