import { InputHTMLAttributes } from "react";

export type TInlineInput = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InlineInput = ({ label, ...props }: TInlineInput) => {
  return (
    <label htmlFor={props.name} className="flex flex-col gap-2 ">
      <span>{label}</span>
      <input className="border rounded" {...props} />
    </label>
  );
};
