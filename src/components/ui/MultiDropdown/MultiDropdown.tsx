
import React, { useState } from 'react';
import { cc } from 'utils/combineClasses';
import '../../../app/styles/global.scss'; 

const organizations = [
  'some-organization-name',
  'git-repo-name',
  'another-organization-name',
  'one-more-organization',
];

interface Props {
  className?: string;
  disabled?: boolean;
}

const MultiDropdown: React.FC<Props> = ({ className = '', disabled = false }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (org: string) => {
    setSelected((prev) =>
      prev.includes(org) ? prev.filter((item) => item !== org) : [...prev, org]
    );
  };

  return (
    <div className={cc('multi-dropdown', disabled && 'disabled', className)}>
      <input
        type="text"
        readOnly
        disabled={disabled}
        value={selected.length ? selected.join(', ') : 'Выберите организацию'}
        onClick={handleToggle}
        className="org-search-input" // <- reuse Input styles!
      />
      {isOpen && (
        <ul className="dropdown-options">
          {organizations.map((org) => (
            <li
              key={org}
              className={cc('dropdown-option', selected.includes(org) && 'selected')}
              onClick={() => handleSelect(org)}
            >
              {org}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
