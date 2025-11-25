import React from "react";

type Props = {
  label: string;
  icon?: React.ReactNode;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

const TextField: React.FC<Props> = ({
  label,
  icon = null,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="flex items-center gap-2 text-md text-slate-500 dark:text-slate-300 p-1">
      <label htmlFor="input-group-1" className="sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {icon}
        </div>
        <input
          type="text"
          id="input-group-1"
          className="block w-full max-w-96 ps-9 pe-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TextField;
