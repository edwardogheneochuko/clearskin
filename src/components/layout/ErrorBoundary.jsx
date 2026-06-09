import React from "react";
import { motion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="text-center max-w-md">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center">
              <span className="text-4xl">🌿</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-2">
              An unexpected error occurred. Don't worry — your cart and favorites are safe.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 mb-6 text-left">
                <summary className="text-xs text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">
                  Error details
                </summary>
                <pre className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-red-500 overflow-auto max-h-32 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                           text-sm font-medium
                           text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-800
                           transition cursor-pointer"
              >
                Try again
              </button>
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition
                           bg-black dark:bg-white
                           text-white dark:text-black
                           hover:bg-neutral-800 dark:hover:bg-gray-200"
              >
                Go home
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    );
  }
}

export default ErrorBoundary;