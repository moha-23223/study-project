import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'
import React from 'react';
import { Search } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({ className }: Props) => {
  return <button className="org-search-button" aria-label="Search">
    <Search size={18} />
  </button>
}


export default Button
