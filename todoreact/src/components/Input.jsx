import React, { useId } from "react";

function Input(
  {
    trailingIcon,
    leadingIcon,
    onTrailingIcon,
    type = "text",
    className = "",
    error,
    errorMessage,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div>
      <div
        className={`flex items-center gap-3 rounded-lg px-2 md:px-4 border-2 border-slate-800 text-slate-800 overflow-hidden hover:scale-[1.02] duration-150 ease-in-out ${className}`}
      >
        {leadingIcon && (
          <label htmlFor={id} className="h-full text-slate-800 cursor-pointer">
            {leadingIcon}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={`h-full w-full bg-transparent outline-none border-none`}
          {...props}
          id={id}
        />
        {trailingIcon && (
          <i
            className="h-full text-slate-800 cursor-pointer"
            onClick={onTrailingIcon}
          >
            {trailingIcon}
          </i>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  );
}

export default React.forwardRef(Input);
