// src/pages/Funds.jsx
import { useState } from "react";
import { Wallet, Plus, CreditCard, ArrowDownLeft } from "lucide-react";
import useAuthStore from "@/store/authStore";
import PageHeader from "@/components/layout/PageHeader";
import toast from "react-hot-toast";

const AMOUNTS = [10, 25, 50, 100];

const Funds = () => {
  const user = useAuthStore((s) => s.user);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [custom, setCustom] = useState("");

  const handleAddFunds = (amount) => {
    const num = Number(amount);
    if (!num || num <= 0) { toast.error("Enter a valid amount"); return; }

    setBalance((prev) => prev + num);
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "credit",
        amount: num,
        label: "Funds added",
        date: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);
    setCustom("");
    toast.success(`$${num.toFixed(2)} added to your wallet`);
  };

  return (
    <>
      <PageHeader 
        title="My Wallet" 
        subtitle="Manage your wallet balance and add funds"
      />
      <div className="min-h-screen bg-skin-base px-4 md:px-10 py-12 dark:bg-skin-bg">
        <div className="max-w-2xl mx-auto space-y-6">

        {/* Balance card */}
        <div className="bg-linear-to-br from-pink-500 to-fuchsia-500 text-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-sm text-white/60">Wallet balance</p>
              <p className="text-xs text-white/40">{user?.email}</p>
            </div>
          </div>
          <p className="text-5xl font-bold">${balance.toFixed(2)}</p>
        </div>

        {/* Quick add */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold mb-4">Add Funds</h2>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => handleAddFunds(amt)}
                className="py-3 rounded-xl border text-sm font-medium hover:bg-pink-50 hover:border-pink-400 hover:text-pink-500 transition cursor-pointer"
              >
                ${amt}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="number"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Custom amount"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={() => handleAddFunds(custom)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-neutral-800 transition cursor-pointer"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="skin-panel rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold">Transaction History</h2>
          </div>

          {transactions.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">
              No transactions yet
            </p>
          ) : (
            <div className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <ArrowDownLeft size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.label}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    +${tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold mb-4">Payment Method</h2>
          <div className="flex items-center gap-3 p-4 rounded-xl border border-dashed text-gray-400">
            <CreditCard size={20} />
            <p className="text-sm">No payment method added yet</p>
          </div>
        </div>

      </div>
      </div>
    </>
  );
};

export default Funds;