import React from "react";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
}

const TexteareaMotive = React.forwardRef<
  HTMLTextAreaElement,
  Partial<InputProps>
>(({ errorMessage, ...props }, ref) => {
  return (
    <div>
      <textarea
        ref={ref}
        rows={4}
        minLength={8}
        maxLength={255}
        placeholder="Escribe aqui tu motivo"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-secondary"
        {...props}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
});

TexteareaMotive.displayName = "TexteareaMotive";
export default TexteareaMotive;
