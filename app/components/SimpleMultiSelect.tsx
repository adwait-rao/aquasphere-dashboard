import React, { useState } from "react";

interface SimpleMultiSelectProps {
  options: string[];
  onChange: (selected: string[]) => void;
}

export function SimpleMultiSelect({
  options,
  onChange,
}: SimpleMultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelected(selectedOptions);
    onChange(selectedOptions);
    console.log(selected);
  };

  return (
    <select
      multiple
      value={selected}
      onChange={handleChange}
      className="w-full p-2 border border-gray-800 rounded-md dark:bg-black outline-none overflow-hidden hover:overflow-y-auto h-10"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
