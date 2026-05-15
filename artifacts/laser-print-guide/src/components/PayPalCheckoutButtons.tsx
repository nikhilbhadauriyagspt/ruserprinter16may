import { useEffect, useRef, useState } from "react";
import { loadScript, type PayPalNamespace } from "@paypal/paypal-js";

type Props = {
  clientId: string;
  amount: number;
  disabled?: boolean;
  onApprove: (details: unknown) => void | Promise<void>;
  onError?: (err: unknown) => void;
};

let paypalPromise: Promise<PayPalNamespace | null> | null = null;
let loadedClientId: string | null = null;

function getPayPal(clientId: string) {
  if (!paypalPromise || loadedClientId !== clientId) {
    loadedClientId = clientId;
    paypalPromise = loadScript({
      clientId,
      currency: "USD",
      intent: "capture",
      components: "buttons",
    });
  }
  return paypalPromise;
}

export function PayPalCheckoutButtons({
  clientId,
  amount,
  disabled,
  onApprove,
  onError,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const amountRef = useRef(amount);
  const onApproveRef = useRef(onApprove);
  const onErrorRef = useRef(onError);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  useEffect(() => {
    onApproveRef.current = onApprove;
  }, [onApprove]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    getPayPal(clientId)
      .then((paypal) => {
        if (cancelled || !paypal || !paypal.Buttons || !containerRef.current) {
          if (!paypal || !paypal.Buttons) {
            setError("PayPal failed to load. Please refresh and try again.");
          }
          return;
        }
        const buttons = paypal.Buttons({
          style: { layout: "vertical", shape: "pill", label: "pay" },
          createOrder: (_data, actions) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amountRef.current.toFixed(2),
                  },
                },
              ],
            }),
          onApprove: async (_data, actions) => {
            if (!actions.order) return;
            const details = await actions.order.capture();
            await onApproveRef.current(details);
          },
          onError: (err) => {
            console.error("PayPal error", err);
            onErrorRef.current?.(err);
          },
        });

        if (!buttons.isEligible()) {
          setError("PayPal is not available in this context.");
          return;
        }

        buttons.render(containerRef.current).catch((err) => {
          console.error("Failed to render PayPal Buttons", err);
          setError("Could not display PayPal buttons.");
        });

        cleanup = () => {
          try {
            buttons.close();
          } catch {
            // noop
          }
        };
      })
      .catch((err) => {
        console.error("Failed to load PayPal SDK", err);
        setError("Could not load PayPal. Please try again later.");
      });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [clientId]);

  return (
    <div className="relative">
      {disabled && (
        <div className="absolute inset-0 bg-white/60 z-10 cursor-not-allowed" />
      )}
      <div ref={containerRef} />
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
