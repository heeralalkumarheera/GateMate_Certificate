import React from 'react';

export default function InputField({ label, name, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <label className="field">
      <span>{label}{required ? ' *' : ''}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </label>
  );
}
