import React from 'react';
import { cc } from 'utils/combineClasses';
import styles from './styles.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cc(styles.inputRoot, className)}
      {...props}
    />
  );
};

export default Input;
