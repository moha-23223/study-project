import React, { useState, useEffect } from 'react';
import { cc } from 'utils/combineClasses';
import '../../../app/styles/global.scss';

interface SearchOption {
  label: string;
  value: string;
  type: 'user' | 'org';
}

const searchOptions: SearchOption[] = [
  { label: 'Organization', value: 'organization', type: 'org' },
  { label: 'User', value: 'user', type: 'user' },
];

interface Props {
  className?: string;
  disabled?: boolean;
  onSelect?: (selected: SearchOption[]) => void;
  defaultOption?: SearchOption;
}

const MultiDropdown: React.FC<Props> = ({ className = '', disabled = false, onSelect, defaultOption }) => {
  const [selected, setSelected] = useState<SearchOption[]>(defaultOption ? [defaultOption] : []);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (option: SearchOption) => {
    const updatedSelection = [option]; // Single selection now
    setSelected(updatedSelection);
    setIsOpen(false); // Close after selection
  };

  useEffect(() => {
    onSelect?.(selected);
  }, [selected]);

  return (
    <div className={cc('multi-dropdown', disabled && 'disabled', className)}>
      <input
        type="text"
        readOnly
        disabled={disabled}
        value={selected.length ? selected[0].label : 'Select organization or user'}
        onClick={handleToggle}
        className="org-search-input"
      />
      {isOpen && (
        <ul className="dropdown-options">
          {searchOptions.map((option) => (
            <li
              key={`${option.value}-${option.type}`}
              className={cc(
                'dropdown-option',
                selected.some(s => s.value === option.value && s.type === option.type) && 'selected'
              )}
              onClick={() => handleSelect(option)}
            >
              {option.label} ({option.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
