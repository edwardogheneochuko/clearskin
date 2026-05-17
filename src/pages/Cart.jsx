import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { CartSkeleton } from "@/components/ui/Skeleton";

const Cart = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const user = useAuthStore((state) => state.user);
  const userId = user?.uid || "guest";

  const cartsMap = useCartStore((state) => state.carts);
  const cart = cartsMap[userId] || [];

  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <CartSkeleton />;

  return (
    <div className="min-h-screen px-4 md:px-10 py-10 mt-20 bg-gray-50">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {cart.length > 0 && (
          <button
            onClick={() => clearCart(userId)}
            className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-600"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500">
            Add products to your cart to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-5 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(userId, item.id)}
                        className="h-8 w-8 cursor-pointer rounded-lg border hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(userId, item.id)}
                        className="h-8 w-8 cursor-pointer rounded-lg border hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(userId, item.id)}
                  className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="sticky top-28 h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

            <div className="mb-4 flex items-center justify-between">
              <span>Total Items</span>
              <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>

            <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/cart/checkout"
              className="mt-6 flex items-center justify-center w-full cursor-pointer rounded-xl bg-black py-3 text-white transition hover:opacity-90"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;