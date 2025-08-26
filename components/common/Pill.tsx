import { cn } from '@/lib/utils';

interface PillProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Pill = ({ 
  label, 
  onClick, 
  variant = 'secondary',
  className = '' 
}: PillProps) => {
  const baseStyles = 'text-sm rounded-full px-4 py-1 transition-colors';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {label}
    </button>
  );
};

export default Pill;
