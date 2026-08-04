import { Check, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Basic music experience.",
    button: "Current Plan",
    featured: false,
    isCurrent: true,
    features: [
      "Shuffle play",
      "Ads between songs",
      "Limited skips",
      "Standard audio quality",
    ],
  },
  {
    name: "Premium Individual",
    price: "10.99",
    description: "Best for one person.",
    button: "Get Premium",
    featured: true,
    isCurrent: false,
    features: [
      "Ad-free music",
      "Unlimited skips",
      "Offline downloads",
      "High quality audio",
      "Play any song",
    ],
  },
  {
    name: "Family",
    price: "16.99",
    description: "Up to 6 accounts.",
    button: "Get Premium",
    featured: false,
    isCurrent: false,
    features: [
      "6 Premium accounts",
      "Family Mix playlist",
      "Offline downloads",
      "Ad-free listening",
      "High quality audio",
    ],
  },
  {
    name: "Student",
    price: "5.99",
    description: "Premium for students.",
    button: "Get Premium",
    featured: false,
    isCurrent: false,
    features: [
      "Ad-free music",
      "Unlimited skips",
      "Offline downloads",
      "High quality audio",
    ],
  },
];

export default function Premium() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full text-white">
      {/* Hero */}
      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-green-500
          via-green-700
          to-black
          p-6
          md:p-12
          mb-12
          shadow-2xl
        "
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Crown
              size={34}
              className="text-yellow-300"
            />

            <h1 className="text-3xl md:text-5xl font-black">
              Premium Experience
            </h1>
          </div>

          <p className="text-base md:text-xl text-green-100 leading-relaxed">
            Unlock ad-free listening, offline downloads,
            unlimited skips and premium sound quality.
          </p>
        </div>
      </section>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
              rounded-3xl
              border
              p-6
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              ${
                plan.isCurrent
                  ? "border-blue-500 bg-gradient-to-br from-blue-900/40 to-neutral-900"
                  : plan.featured
                  ? "border-green-500 bg-gradient-to-br from-green-900/40 to-neutral-900 shadow-lg shadow-green-500/20"
                  : "border-neutral-700 bg-neutral-900 hover:border-green-400"
              }
            `}
          >
            {plan.featured && (
              <div className="inline-block bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold mb-3">
                MOST POPULAR
              </div>
            )}

            {plan.isCurrent && (
              <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                CURRENT PLAN
              </div>
            )}

            <h2 className="text-3xl font-black">
              {plan.name}
            </h2>

            <div className="mt-6">
              <span className="text-5xl font-black">
                ${plan.price}
              </span>

              <span className="text-gray-400 ml-1">
                /month
              </span>
            </div>

            <p className="text-gray-400 mt-4 min-h-[48px]">
              {plan.description}
            </p>

            <button
              disabled={plan.isCurrent}
              onClick={() => {
                if (!plan.isCurrent) {
                  navigate("/billing");
                }
              }}
              className={`
                mt-8
                w-full
                py-3
                rounded-full
                font-bold
                transition
                ${
                  plan.isCurrent
                    ? "bg-neutral-700 text-gray-300 cursor-not-allowed"
                    : plan.featured
                    ? "bg-green-500 text-black hover:scale-105"
                    : "bg-white text-black hover:bg-green-500 hover:text-black hover:scale-105"
                }
              `}
            >
              {plan.button}
            </button>

            <div className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <Check
                    size={18}
                    className="text-green-500 mt-1 flex-shrink-0"
                  />

                  <span className="text-sm md:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <section
        className="
          mt-16
          bg-neutral-900
          rounded-2xl
          p-6
          md:p-10
        "
      >
        {/* Keep your existing Benefits content */}
      </section>
    </div>
  );
}