import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle,
  CreditCard,
  Crown,
  Calendar,
} from "lucide-react";

export default function Billing() {
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="space-y-8 text-white">

      {/* Header */}

      <div>
        <h1 className="text-3xl md:text-5xl font-black">
          Billing
        </h1>

        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Manage your subscription and payment details.
        </p>
      </div>

      {/* Current Plan */}

      <div
        className="
          bg-gradient-to-r
          from-green-500
          to-green-700
          rounded-2xl
          p-5
          md:p-8
          text-black
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <Crown size={28} />

          <h2 className="text-2xl md:text-3xl font-bold">
            Spotify Free
          </h2>
        </div>

        <p className="text-sm md:text-base">
          You're currently using the free plan.
        </p>

        <button
          onClick={() => navigate("/premium")}
          className="
            mt-6
            bg-black
            text-white
            px-6
            md:px-8
            py-3
            rounded-full
            font-bold
            hover:scale-105
            transition
            w-full
            sm:w-auto
          "
        >
          Upgrade to Premium
        </button>
      </div>

      {/* Payment */}

      <div
        className="
          bg-neutral-900
          rounded-2xl
          p-5
          md:p-8
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={24} />

          <h2 className="text-xl md:text-2xl font-bold">
            Payment Method
          </h2>
        </div>

        <div
          className="
            border
            border-neutral-700
            rounded-xl
            p-5
          "
        >
          <p className="text-gray-400 text-sm md:text-base">
            No payment method added.
          </p>

          <button
            onClick={() => setShowPayment(true)}
            className="
              mt-5
              bg-green-500
              text-black
              px-6
              py-3
              rounded-full
              font-bold
              hover:scale-105
              transition
              w-full
              sm:w-auto
            "
          >
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History */}

      <div
        className="
          bg-neutral-900
          rounded-2xl
          p-5
          md:p-8
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <Calendar size={24} />

          <h2 className="text-xl md:text-2xl font-bold">
            Billing History
          </h2>
        </div>

        <div className="text-center py-8 md:py-10 text-gray-400">
          <CheckCircle
            size={48}
            className="
              mx-auto
              mb-4
              text-green-500
            "
          />

          <p className="text-sm md:text-base">
            📄

No invoices yet

Invoices from future subscriptions
will appear here.
          </p>
        </div>
      </div>

      {/* Payment Modal */}

      {showPayment && (
        <div
          className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            p-4
            z-50
          "
        >
          <div
            className="
              bg-neutral-900
              rounded-2xl
              p-6
              md:p-8
              w-full
              max-w-md
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Add Debit / Credit Card
            </h2>

            <input
              placeholder="Card Number"
              className="
                w-full
                bg-neutral-800
                p-3
                rounded-lg
                mb-3
              "
            />

            <input
              placeholder="MM / YY"
              className="
                w-full
                bg-neutral-800
                p-3
                rounded-lg
                mb-3
              "
            />

            <input
              placeholder="CVV"
              className="
                w-full
                bg-neutral-800
                p-3
                rounded-lg
                mb-5
              "
            />

            <button
              onClick={() => setShowPayment(false)}
              className="
                w-full
                bg-green-500
                text-black
                py-3
                rounded-full
                font-bold
              "
            >
              ✓ Payment method added successfully
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="
                w-full
                mt-3
                text-gray-400
              "
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}