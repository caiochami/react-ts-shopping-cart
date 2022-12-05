import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  color: string;
};

export function StoreItem({ id, imgUrl, name, price, color }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            src={imgUrl}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">{color}</p>
        </div>
        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            {formatCurrency(price)}
          </p>
        </div>
      </div>
      <div className="mt-6">
        {quantity === 0 ? (
          <button
            className="w-full relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
            onClick={() => increaseCartQuantity(id)}
          >
            Add to bag<span className="sr-only">, {name}</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center items-center gap-2">
              <button
                type="button"
                onClick={() => decreaseCartQuantity(id)}
                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <MinusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <span className="font-semibold">{quantity}</span> in cart
              </div>
              <button
                type="button"
                onClick={() => increaseCartQuantity(id)}
                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeFromCart(id)}
                className="inline-flex items-center rounded border border-red-300 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
