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

function loadPayPalSafe(clientId: string): Promise<PayPalNamespace | null> {
  if (!paypalPromise || loadedClientId !== clientId) {
    loadedClientId = clientId;
    paypalPromise = (async () => {
      try {
        const paypal = await loadScript({
          clientId,
          currency: "USD",
          intent: "capture",
          components: "buttons",
        });
        return paypal;
      } catch (err) {
        console.error("PayPal SDK load failed", err);
        paypalPromise = null;
        loadedClientId = null;
        return null;
      }
    })();
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
  const [loading, setLoading] = useState(true);

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
    let buttonsInstance: { close: () => void } | null = null;

    const mount = async () => {
      try {
        const paypal = await loadPayPalSafe(clientId);
        if (cancelled) return;
        if (!paypal || !paypal.Buttons || !containerRef.current) {
          setError("PayPal failed to load. Please refresh and try again.");
          setLoading(false);
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
            try {
              if (!actions.order) return;
              const details = await actions.order.capture();
              await onApproveRef.current(details);
            } catch (err) {
              console.error("PayPal onApprove failed", err);
              setError("Payment could not be completed. Please try again.");
            }
          },
          onError: (err) => {
            console.error("PayPal error", err);
            try {
              onErrorRef.current?.(err);
            } catch {
              // noop
            }
          },
        });

        let eligible = true;
        try {
          eligible = buttons.isEligible();
        } catch (err) {
          console.error("PayPal isEligible failed", err);
          eligible = false;
        }
        if (!eligible) {
          setError("PayPal is not available in this context.");
          setLoading(false);
          return;
        }

        try {
          await buttons.render(containerRef.current);
        } catch (err) {
          console.error("Failed to render PayPal Buttons", err);
          if (!cancelled) setError("Could not display PayPal buttons.");
          return;
        }

        if (cancelled) {
          try {
            buttons.close();
          } catch {
            // noop
          }
          return;
        }

        buttonsInstance = buttons;
        setLoading(false);
      } catch (err) {
        console.error("PayPal mount failed", err);
        if (!cancelled) {
          setError("Could not load PayPal. Please try again later.");
          setLoading(false);
        }
      }
    };

    mount();

    return () => {
      cancelled = true;
      if (buttonsInstance) {
        try {
          buttonsInstance.close();
        } catch {
          // noop
        }
      }
    };
  }, [clientId]);

  return (
    <div className="relative min-h-[80px]">
      {disabled && (
        <div className="absolute inset-0 bg-white/60 z-10 cursor-not-allowed" />
      )}
      {loading && !error && (
        <div className="text-sm text-slate-500 text-center py-4">
          Loading PayPal…
        </div>
      )}
      <div ref={containerRef} />
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
