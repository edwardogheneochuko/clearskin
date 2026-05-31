const base = {
  common: {
    borderRadius: "16px",
    padding: "14px 16px",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    marginTop: "70px",
  },
};

const lightModeStyles = {
  base: {
    ...base.common,
    background: "rgba(17, 24, 39, 0.95)",
    color: "#f8fafc",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  success: {
    background: "rgba(22, 101, 52, 0.95)",
    color: "#dcfce7",
    border: "1px solid rgba(34,197,94,0.35)",
  },
  error: {
    background: "rgba(127, 29, 29, 0.95)",
    color: "#fee2e2",
    border: "1px solid rgba(239,68,68,0.35)",
  },
  loading: {
    background: "rgba(30, 41, 59, 0.95)",
    color: "#e2e8f0",
    border: "1px solid rgba(148,163,184,0.25)",
  },
};

const darkModeStyles = {
  base: {
    ...base.common,
    background: "rgba(255, 255, 255, 0.92)",
    color: "#0f172a",
    border: "1px solid rgba(226,232,240,0.9)",
  },
  success: {
    background: "rgba(236, 253, 245, 0.95)",
    color: "#065f46",
    border: "1px solid rgba(16,185,129,0.3)",
  },
  error: {
    background: "rgba(254, 242, 242, 0.95)",
    color: "#7f1d1d",
    border: "1px solid rgba(239,68,68,0.25)",
  },
  loading: {
    background: "rgba(248, 250, 252, 0.95)",
    color: "#0f172a",
    border: "1px solid rgba(148,163,184,0.25)",
  },
};

export const getToastConfig = () => {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const s = isDark ? darkModeStyles : lightModeStyles;

  return {
    position: "top-right",
    toastOptions: {
      duration: 3000,
      style: s.base,

      success: {
        style: s.success,
        iconTheme: {
          primary: "#22c55e",
          secondary: isDark ? "#ffffff" : "#0f172a",
        },
      },

      error: {
        style: s.error,
        iconTheme: {
          primary: "#ef4444",
          secondary: isDark ? "#ffffff" : "#0f172a",
        },
      },

      loading: {
        style: s.loading,
        iconTheme: {
          primary: "#3b82f6",
          secondary: isDark ? "#ffffff" : "#0f172a",
        },
      },
    },
  };
};

export const toastConfig = getToastConfig();