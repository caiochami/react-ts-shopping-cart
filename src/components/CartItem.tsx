import { XMarkIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((item) => item.id === id);

  if (!item) return null;

  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={item.imgUrl}
        alt={item.name}
        className="h-16 w-32 object-cover object-center"
      />
      <div className="mr-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-xs text-gray-500">x{quantity}</span>
          )}
        </div>
        <div className="text-gray-500">{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <button
        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => removeFromCart(item.id)}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
