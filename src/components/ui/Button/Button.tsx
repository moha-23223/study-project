import { cc } from 'utils/combineClasses';
import styles from './styles.module.scss';
import React from 'react';
import { Search } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({ className, loading, children, ...props }: Props) => {
  return (
    <button
      {...props} // Spread other button props like onClick, etc.
      className={cc(styles.orgSearchButton, className)} // Corrected class name
      aria-label="Search"
      disabled={loading} // Disable the button while loading
    >
      {loading ? <div className="spinner" /> : <Search size={18} />}
      {children}
    </button>
  );
};

export default Button;
