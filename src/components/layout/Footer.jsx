import React from "react";

const Footer = ({ footer }) => {
  return (
    <footer className="bg-white border-t mt-20 py-12 px-5 md:px-10">

      <div className="grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-2xl font-semibold mb-4">
            {footer.company.title}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            {footer.company.location}
          </p>

          <p className="text-sm text-black font-semibold">
            {footer.company.phone}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {footer.company.email}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Useful Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-500">
            {footer?.usefulLinks?.map((link, index) => (
              <li
                key={index}
                className="hover:underline cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Information
          </h3>

          <ul className="space-y-2 text-sm text-gray-500">
            {footer?.informationLinks?.map((link, index) => (
              <li
                key={index}
                className=" hover:underline cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Secure Payments
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
            {[
              "https://img.icons8.com/color/48/visa.png",
              "https://img.icons8.com/color/48/mastercard.png",
              "https://img.icons8.com/color/48/paypal.png",
              "https://img.icons8.com/color/48/apple-pay.png"
            ].map((src, index) => (
              <img
                key={index}
                src={src}
                alt="payment method"
                className="w-10 h-10 object-contain hover:scale-105 transition"
              />
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4">
            All transactions are secure and encrypted.
          </p>
        </div>

      </div>

      <div className="border-t mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Clear Skin. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;