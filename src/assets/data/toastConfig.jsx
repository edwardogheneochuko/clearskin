export const toastConfig = {
  position: "top-right",
  toastOptions: {
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#111827",
      borderRadius: "14px",
      padding: "12px 16px",
      fontSize: "13px",
      fontWeight: "500",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      border: "1px solid #f3f4f6",
      marginTop: "70px",
    },

    success: {
      style: {
        background: "#ffffff",
        color: "#111827",
        border: "1px solid #fce7f3",
      },
      iconTheme: {
        primary: "#ec4899",
        secondary: "#fff",
      },
    },

    error: {
      style: {
        background: "#ffffff",
        color: "#111827",
        border: "1px solid #fee2e2",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },

    loading: {
      style: {
        background: "#ffffff",
        color: "#111827",
        border: "1px solid #f3f4f6",
      },
      iconTheme: {
        primary: "#ec4899",
        secondary: "#fff",
      },
    },
  },
};