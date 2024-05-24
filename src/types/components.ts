import { TABS } from "@/utils";

export type VariantsType = "primary" | "secondary";

export type TabsSelectorType = (typeof TABS)[number];

export type GenericProps<Params = any> = {
  loading?: boolean;
  variant?: VariantsType;
} & Params;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  classNameLabel?: string;
  startIcon?: React.ReactNode;
}
