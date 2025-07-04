import React from "react";
import { CardProps } from "../../interfaces";

const Card: React.FC<CardProps> = ({ image, title, description, price }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-blue-600 font-bold">{price}</p>
      </div>
    </div>
  );
};

export default Card;
