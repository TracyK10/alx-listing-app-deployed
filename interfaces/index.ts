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

export interface PropertyProps {
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string;
}
