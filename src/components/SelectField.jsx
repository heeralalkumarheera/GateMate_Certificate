import React from 'react';

export default function SelectField({ label, options, value, onChange, name, required = false }) {
  const normalized = options.map((option) => {
    if (typeof option === 'string') return { value: option, label: option };
    return option;
  });

  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} value={value} onChange={onChange} required={required}>
        <option value="">Select {label}</option>
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
