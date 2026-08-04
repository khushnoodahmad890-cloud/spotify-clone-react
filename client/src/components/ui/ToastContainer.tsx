import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const ACCENTS = {
  success: "border-green-500/40 text-green-400",
  error: "border-red-500/40 text-red-400",
  info: "border-blue-500/40 text-blue-400",
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="
        fixed
        top-4
        right-4
        z-[100]
        flex
        flex-col
        gap-2
        w-[calc(100%-2rem)]
        max-w-sm
      "
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type];

        return (
          <div
            key={toast.id}
            className={`
              flex
              items-center
              gap-3
              bg-neutral-900/95
              backdrop-blur-xl
              border
              ${ACCENTS[toast.type]}
              rounded-xl
              px-4
              py-3
              shadow-2xl
              animate-toast-in
            `}
          >
            <Icon size={20} className="shrink-0" />

            <p className="text-sm text-white flex-1 leading-snug">
              {toast.message}
            </p>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-white transition shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
