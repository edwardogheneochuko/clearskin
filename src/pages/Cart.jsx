import React from "react";
import useCartStore from "../store/cartStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="px-4 md:px-10 py-10 mt-20">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-gray-500 text-sm">
                    ${item.price} x {item.quantity || 1}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-semibold">
            Total: ${total}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;