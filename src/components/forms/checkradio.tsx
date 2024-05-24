import React from "react";

import { classNames } from "@/utils";
import { InputProps } from "@/types/components";

const InputCheckradio: React.FC<InputProps> = ({
  id,
  label,
  className,
  classNameLabel,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="radio"
        className={classNames(
          "w-4 h-4 text-secondary focus:ring-2",
          className as string
        )}
        {...props}
      />
      <label
        htmlFor={id}
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

export default InputCheckradio;
