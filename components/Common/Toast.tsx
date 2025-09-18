"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn, createId } from "@/lib/util";

export type ToastVariant = "info" | "success" | "error";

export interface ToastPayload {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastEntry extends ToastPayload {
  id: string;
  createdAt: number;
}

interface ToastContextValue {
  push: (toast: ToastPayload) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    ({ duration = 3500, ...toast }: ToastPayload) => {
      const entry: ToastEntry = {
        ...toast,
        id: createId("toast"),
        createdAt: Date.now()
      };
      setToasts((current) => [...current, entry]);
      if (duration > 0) {
        setTimeout(() => dismiss(entry.id), duration);
      }
    },
    [dismiss]
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 p-4">
        {toasts.map((toast) => {
          const Icon = toast.variant === "success" ? CheckCircle : toast.variant === "error" ? AlertCircle : Info;
          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border bg-card p-4 shadow-lg",
                toast.variant === "success" && "border-green-500",
                toast.variant === "error" && "border-red-500"
              )}
            >
              <Icon className="mt-0.5 h-5 w-5" />
              <div className="flex-1 text-sm">
                <div className="font-semibold">{toast.title}</div>
                {toast.description ? <p className="text-muted-foreground">{toast.description}</p> : null}
              </div>
              <button
                className="rounded-md bg-transparent p-1 text-muted-foreground transition hover:text-foreground"
                onClick={() => dismiss(toast.id)}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export const Toaster = () => null;
