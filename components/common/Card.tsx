import { PropertyProps } from "@/interfaces";

const Card = ({ name, image, price, rating }: PropertyProps) => (
  <div className="rounded shadow bg-white">
    <img
      src={image}
      alt={name}
      className="h-48 w-full object-cover rounded-t"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">${price}/night</p>
      <p className="text-sm text-yellow-500">★ {rating}</p>
    </div>
  </div>
);

export default Card;
