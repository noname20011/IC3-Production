import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "../../libs/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export type ToastVariant = "default" | "glass" | "success" | "error";

const toastVariants = cva(
  "group relative pointer-events-auto flex w-full items-start gap-3 overflow-hidden rounded-2xl p-4 pr-10 shadow-2xl transition-all",
  {
    variants: {
      variant: {
        default: "bg-white/20 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)]",
        glass: "bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-[0_8px_30px_rgb(0,0,0,0.25)]",
        success: "bg-emerald-500/10 border border-emerald-400/20 text-emerald-100 shadow-[0_8px_30px_rgb(16,185,129,0.3)]",
        error: "bg-rose-500/10 border border-rose-400/20 text-rose-100 shadow-[0_8px_30px_rgb(239,68,68,0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ToastProps = React.ComponentPropsWithoutRef<
  typeof ToastPrimitives.Root
> & {
  variant?: ToastVariant;
  duration?: number;
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(
  (
    { className, variant, duration = 5000, children, ...props },
    ref
  ) => {
    return (
      <ToastPrimitives.Root
        ref={ref}
        className={cn(
          toastVariants({ variant }),
          "relative overflow-hidden"
        )}
        {...props}
      >
        {/* content */}
        <div className="flex w-full items-start gap-3">
          {children}
        </div>

        {/* 🔥 progress bar */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-pink-500 origin-left"
        />

        {/* close button */}
        <ToastPrimitives.Close className="absolute right-2 top-2 rounded-md p-1 text-white/60 hover:text-white transition">
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>

        {/* glow effect */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-400/10 blur-3xl" />
      </ToastPrimitives.Root>
    );
  }
);

Toast.displayName = "Toast";

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold text-white", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm text-white/80", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

export {
  ToastProvider,
  ToastViewport,
  ToastClose,
  Toast,
  ToastTitle,
  ToastDescription,
};