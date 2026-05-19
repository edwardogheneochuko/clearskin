import { create } from "zustand";

const PROMO_CODES = {
  "CLEARSKIN10": 10,
  "WELCOME20":   20,
  "SAVE15":      15,
  "BEAUTY30":    30,
};

const usePromoStore = create((set, get) => ({
  code:       "",
  discount:   0,
  applied:    false,
  error:      "",

  setCode: (code) => set({ code: code.toUpperCase() }),

  applyCode: () => {
    const { code } = get();

    if (!code.trim()) {
      set({ error: "Enter a promo code", discount: 0, applied: false });
      return;
    }

    const discount = PROMO_CODES[code.trim().toUpperCase()];

    if (!discount) {
      set({ error: "Invalid promo code", discount: 0, applied: false });
      return;
    }

    set({ discount, applied: true, error: "" });
  },

  removeCode: () => set({ code: "", discount: 0, applied: false, error: "" }),
}));

export default usePromoStore;