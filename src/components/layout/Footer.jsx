import React from "react";
import content from "@/assets/data/content.json"

const Footer = () => {
  const footer = content.footer
  
  return (
    <footer className=" bg-white dark:bg-gray-950
        border-t border-gray-200 dark:border-gray-800
         pt-14 pb-10 px-5 md:px-10 transition-colors duration-300 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-pink-400">
            {footer.company?.title || "Company"}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {footer.company?.location || "Your location here"}
          </p>

          {footer.company?.phone && (
            <p className="text-sm font-semibold text-gray-900 dark:text-pink-300">
              {footer.company.phone}
            </p>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {footer.company?.email}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-pink-400">
            Useful Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            {(footer.usefulLinks || []).map((link, index) => (
              <li key={index} className="cursor-pointer hover:text-pink-400
                  transition-colors duration-200 ">
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-pink-400">
            Information
          </h3>

          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            {(footer.informationLinks || []).map((link, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-pink-400
                  transition-colors duration-200 ">
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-pink-400">
            Secure Payments
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
            {[
              "https://img.icons8.com/color/48/visa.png",
              "https://img.icons8.com/color/48/mastercard.png",
              "https://img.icons8.com/color/48/paypal.png",
              "https://img.icons8.com/color/48/apple-pay.png",
            ].map((src) => (
              <img
                key={src}
                src={src}
                alt="payment method"
                loading="lazy"
                className="
                  w-10 h-10 object-contain
                  hover:scale-110 transition-transform duration-300
                "/>
            ))}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            All transactions are secure and encrypted.
          </p>
        </div>
      </div>

      <div className="
          border-t border-gray-200 dark:border-gray-800
          mt-12 pt-6 text-center text-sm
          text-gray-500 dark:text-gray-400
        ">
        © {new Date().getFullYear()} Clear Skin. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;