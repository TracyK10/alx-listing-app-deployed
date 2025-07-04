// Card component props
export interface CardProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

// Button component props
export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}
