
import { AlertCircle, CircleCheckBig, CircleX } from "lucide-react";
import { useToast } from "../../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast"

export function Toaster() {
  const { toasts } = useToast()

  const variantStyles: Record<string, string> = {
    default: "bg-white/20 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.25)]",
    success: "bg-emerald-500/10 border border-emerald-400/20 text-emerald-100 shadow-[0_8px_30px_rgb(16,185,129,0.3)]",
    error: "bg-rose-500/10 border border-rose-400/20 text-rose-100 shadow-[0_8px_30px_rgb(239,68,68,0.3)]",
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} className={`p-2 pl-4 fixed top-4 right-4 z-[1000] max-w-[20rem] rounded-sm text-lg
    ${variantStyles[variant ?? "default"]}`} {...props}>
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-stone-100/20">
                {variant === "error" && <CircleX className="h-10 w-10 text-red-400" />}
                {variant === "success" && <CircleCheckBig className="h-10 w-10 text-green-400" />}
              </div>
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
