import React from 'react';
import '../../../app/styles/global.scss';
interface Props {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<Props> = ({ checked = false, disabled = false, onChange }) => {
  return (
    <label className={`custom-checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="checkbox-mark" />
    </label>
  );
};

export default Checkbox;
