import React from "react";

import { classNames } from "@/utils";
import { InputProps } from "@/types/components";

const Input = React.forwardRef<HTMLInputElement, Partial<InputProps>>(
  (
    {
      id,
      label,
      startIcon,
      className,
      errorMessage,
      classNameLabel,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2 flex-1">
        {label && (
          <label
            htmlFor={id}
            className={classNames(
              "block text-sm font-medium leading-6 text-gray-900",
              classNameLabel as string
            )}
          >
            {label}
          </label>
        )}
        <div className="px-3 gap-3 flex overflow-hidden w-full rounded-xl border border-secondary text-gray-900 shadow-sm transition-all bg-white">
          {startIcon}
          <input
            ref={ref}
            id={id}
            className={classNames(
              "block w-full px-0 border-none focus:shadow-none focus:ring-0 outline-none outline-0 focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 disabled:opacity-50",
              className as string
            )}
            {...props}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {children}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
