import React from "react";

import { GenericProps } from "@/types/components";
import { classNames, _BASE_VARIANTS } from "@/utils";

import Loading from "../utils/loading";

type Props = GenericProps<React.ButtonHTMLAttributes<HTMLButtonElement>>;

const Button: React.FC<Props> = ({
  loading,
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={classNames(
        "flex justify-center w-full text-white text-center font-bold py-2 px-4 rounded-lg",
        className as string,
        _BASE_VARIANTS[variant]
      )}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
