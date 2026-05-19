export const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export const Input = ({ error, ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-xl bg-gray-100 text-sm outline-none focus:ring-2 transition
      ${error ? "focus:ring-red-400" : "focus:ring-pink-400"}`}
  />
);