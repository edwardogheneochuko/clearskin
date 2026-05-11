import React from "react";
import useCartStore from "../store/cartStore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="px-4 md:px-10 py-10 mt-20">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Cart</h1>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm text-red-500"
          >
            Clear Cart
          </button>
        )}
      </div>

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
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-medium">{item.title}</h2>

                  <p className="text-gray-500 text-sm">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 border rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>

                  </div>
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