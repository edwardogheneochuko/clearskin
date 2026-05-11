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
    <div className="min-h-screen px-4 md:px-10 py-10 mt-20 bg-gray-50">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm font-medium text-red-500 hover:text-red-600"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">
            Your cart is empty
          </h2>

          <p className="text-gray-500">
            Add products to your cart to see them here.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          
          <div className="space-y-5">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              >
                
                <div className="flex items-center gap-4">
                  
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    <p className="text-sm mt-1 font-medium">
                      Subtotal: $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm font-medium hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-28">
            
            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span>Total Items</span>
              <span>
                {cart.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-lg font-semibold border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;